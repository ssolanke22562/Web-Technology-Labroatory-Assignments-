const connectDB = require('../../src/config/db');
const Student = require('../../src/models/Student');

/**
 * Netlify Serverless Function: Read-Only Summary & Analytics
 * Route: /.netlify/functions/summary or /api/summary (via redirect)
 */
exports.handler = async (event, context) => {
  // Allow Netlify background callback to not wait for event loop to empty (for mongoose)
  context.callbackWaitsForEmptyEventLoop = false;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method Not Allowed',
        message: 'This Netlify serverless endpoint provides read-only summary access (GET only).',
      }),
    };
  }

  try {
    await connectDB();

    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit, 10) || 5;
    const departmentFilter = queryParams.department;

    const baseMatch = {};
    if (departmentFilter && departmentFilter !== 'All') {
      baseMatch.department = departmentFilter;
    }

    const [
      totalCount,
      overallStats,
      topStudents,
      departmentSummary,
    ] = await Promise.all([
      Student.countDocuments(baseMatch),
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
      Student.find(baseMatch)
        .sort({ gpa: -1, attendance: -1 })
        .limit(limit)
        .select('rollNumber name department course semester gpa attendance skills'),
      Student.aggregate([
        { $match: baseMatch },
        {
          $group: {
            _id: '$department',
            studentCount: { $sum: 1 },
            avgGPA: { $avg: '$gpa' },
            maxGPA: { $max: '$gpa' },
          },
        },
        { $sort: { studentCount: -1 } },
      ]),
    ]);

    const stats = overallStats[0] || {
      averageGPA: 0,
      highestGPA: 0,
      lowestGPA: 0,
      averageAttendance: 0,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        service: 'Netlify Serverless Function (Summary & Analytics)',
        timestamp: new Date().toISOString(),
        summary: {
          totalStudents: totalCount,
          averageGPA: stats.averageGPA ? parseFloat(stats.averageGPA.toFixed(2)) : 0,
          highestGPA: stats.highestGPA || 0,
          lowestGPA: stats.lowestGPA || 0,
          averageAttendance: stats.averageAttendance
            ? `${parseFloat(stats.averageAttendance.toFixed(1))}%`
            : '0%',
        },
        topPerformers: topStudents,
        departmentBreakdown: departmentSummary.map((dept) => ({
          department: dept._id,
          count: dept.studentCount,
          averageGPA: parseFloat(dept.avgGPA.toFixed(2)),
          maxGPA: dept.maxGPA,
        })),
      }),
    };
  } catch (error) {
    console.error('Netlify Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        service: 'Netlify Serverless Function',
        message: error.message,
      }),
    };
  }
};
