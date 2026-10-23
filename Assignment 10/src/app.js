const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');
const summaryController = require('./controllers/summaryController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve Frontend Static UI
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/students', studentRoutes);

// Direct Summary endpoint alias matching serverless endpoint path
app.get('/api/summary', (req, res, next) => {
  req.isServerless = false;
  summaryController.getStudentSummary(req, res, next);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Student Portal API is running smoothly',
  });
});

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found. Available endpoints: /api/students, /api/summary, /api/health`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

module.exports = app;
