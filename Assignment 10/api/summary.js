const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Student = require('../src/models/Student');

/**
 * Vercel Serverless Function: Read-Only Summary & Top Performers
 * Route: /api/summary
 * Supports query params:
 *   - ?limit=5 (top performers limit)
 *   - ?department=Computer Science (optional filter)
 */
module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Enforce read-only constraint
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'This serverless endpoint provides read-only summary access (GET only).',
    });
  }

  const startTime = Date.now();

  try {
    // 1. Connect to MongoDB using cached connection
    await connectDB();

    const limit = parseInt(req.query.limit, 10) || 5;
    const departmentFilter = req.query.department;

    const baseMatch = {};
    if (departmentFilter && departmentFilter !== 'All') {
      baseMatch.department = departmentFilter;
    }

    // 2. Perform parallel aggregation queries
    const [
      totalCount,
      overallStats,
      topStudents,
      departmentSummary,
      performanceDistribution,
    ] = await Promise.all([
      // Total count
      Student.countDocuments(baseMatch),

      // Overall aggregates
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

      // Top performers
      Student.find(baseMatch)
        .sort({ gpa: -1, attendance: -1 })
        .limit(limit)
        .select('rollNumber name department course semester gpa attendance skills createdAt'),

      // Department breakdown
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

      // Grade/Performance buckets
      Student.aggregate([
        { $match: baseMatch },
        {
          $bucket: {
            groupBy: '$gpa',
            boundaries: [0, 5.0, 7.0, 8.5, 10.1],
            default: 'Other',
            output: {
              count: { $sum: 1 },
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

    const responsePayload = {
      success: true,
      service: 'Vercel Serverless Function (Summary & Analytics)',
      environment: process.env.VERCEL ? 'Vercel Production' : 'Development / Local Serverless Emulation',
      executionTimeMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      filtersApplied: {
        department: departmentFilter || 'All',
        topLimit: limit,
      },
      summary: {
        totalStudents: totalCount,
        averageGPA: stats.averageGPA ? parseFloat(stats.averageGPA.toFixed(2)) : 0,
        highestGPA: stats.highestGPA || 0,
        lowestGPA: stats.lowestGPA || 0,
        averageAttendance: stats.averageAttendance
          ? parseFloat(stats.averageAttendance.toFixed(1))
          : 0,
      },
      topPerformers: topStudents.map((st, index) => ({
        rank: index + 1,
        rollNumber: st.rollNumber,
        name: st.name,
        department: st.department,
        course: st.course,
        semester: st.semester,
        gpa: st.gpa,
        attendance: `${st.attendance}%`,
        skills: st.skills,
      })),
      departmentStats: departmentSummary.map((dept) => ({
        department: dept._id,
        studentsCount: dept.studentCount,
        averageGPA: parseFloat(dept.avgGPA.toFixed(2)),
        highestGPA: dept.maxGPA,
        averageAttendance: `${parseFloat(dept.avgAttendance.toFixed(1))}%`,
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

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error('Serverless Summary Function Error:', error);
    return res.status(500).json({
      success: false,
      service: 'Vercel Serverless Function',
      message: 'Failed to fetch student summary from database',
      error: error.message,
    });
  }
};
