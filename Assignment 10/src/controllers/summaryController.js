const Student = require('../models/Student');

/**
 * @desc    Get comprehensive read-only student summary, stats & top performers
 * @route   GET /api/summary (or Serverless endpoint)
 * @access  Public (Read-Only)
 */
exports.getStudentSummary = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const departmentFilter = req.query.department;

    const baseMatch = {};
    if (departmentFilter && departmentFilter !== 'All') {
      baseMatch.department = departmentFilter;
    }

    // Parallel Aggregation & Queries for optimal performance
    const [
      totalCount,
      overallStats,
      topStudents,
      departmentSummary,
      performanceDistribution,
    ] = await Promise.all([
      // 1. Total student count
      Student.countDocuments(baseMatch),

      // 2. Institution Overall Stats (Average GPA, Min, Max, Avg Attendance)
      Student.aggregate([
        { $match: baseMatch },
        {
          $group: {
            _id: null,
            averageGPA: { $avg: '$gpa' },
            highestGPA: { $max: '$gpa' },
            lowestGPA: { $min: '$gpa' },
            averageAttendance: { $avg: '$attendance' },
          },
        },
      ]),

      // 3. Top-performing students (Sorted by GPA desc, then attendance desc)
      Student.find(baseMatch)
        .sort({ gpa: -1, attendance: -1 })
        .limit(limit)
        .select('rollNumber name department course semester gpa attendance skills createdAt'),

      // 4. Department-wise breakdown
      Student.aggregate([
        { $match: baseMatch },
        {
          $group: {
            _id: '$department',
            studentCount: { $sum: 1 },
            avgGPA: { $avg: '$gpa' },
            maxGPA: { $max: '$gpa' },
            avgAttendance: { $avg: '$attendance' },
          },
        },
        { $sort: { studentCount: -1 } },
      ]),

      // 5. Performance Tier distribution
      Student.aggregate([
        { $match: baseMatch },
        {
          $bucket: {
            groupBy: '$gpa',
            boundaries: [0, 5.0, 7.0, 8.5, 10.1],
            default: 'Other',
            output: {
              count: { $sum: 1 },
              students: { $push: '$name' },
            },
          },
        },
      ]),
    ]);

    const stats = overallStats[0] || {
      averageGPA: 0,
      highestGPA: 0,
      lowestGPA: 0,
      averageAttendance: 0,
    };

    const summaryPayload = {
      success: true,
      timestamp: new Date().toISOString(),
      endpointType: req.isServerless ? 'Vercel/Netlify Serverless Function' : 'Express API Route',
      filter: {
        department: departmentFilter || 'All',
        topLimit: limit,
      },
      overview: {
        totalStudents: totalCount,
        averageGPA: stats.averageGPA ? parseFloat(stats.averageGPA.toFixed(2)) : 0,
        highestGPA: stats.highestGPA || 0,
        lowestGPA: stats.lowestGPA || 0,
        averageAttendance: stats.averageAttendance
          ? parseFloat(stats.averageAttendance.toFixed(1))
          : 0,
      },
      topPerformers: topStudents,
      departmentBreakdown: departmentSummary.map((dept) => ({
        department: dept._id,
        count: dept.studentCount,
        averageGPA: parseFloat(dept.avgGPA.toFixed(2)),
        maxGPA: dept.maxGPA,
        averageAttendance: parseFloat(dept.avgAttendance.toFixed(1)),
      })),
      performanceTiers: performanceDistribution.map((tier) => {
        let label = 'Other';
        if (tier._id === 0) label = 'Needs Improvement (< 5.0)';
        else if (tier._id === 5.0) label = 'Good (5.0 - 6.9)';
        else if (tier._id === 7.0) label = 'Very Good (7.0 - 8.4)';
        else if (tier._id === 8.5) label = 'Outstanding (8.5 - 10.0)';
        return {
          tier: label,
          count: tier.count,
        };
      }),
    };

    return res.status(200).json(summaryPayload);
  } catch (error) {
    console.error('Error fetching summary:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while generating student summary',
      error: error.message,
    });
  }
};
