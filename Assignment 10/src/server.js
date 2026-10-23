const app = require('./app');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    app.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`🚀 Student CRUD Server is running on port: ${PORT}`);
      console.log(`🌐 Local UI & API URL: http://localhost:${PORT}`);
      console.log(`📊 Summary Endpoint: http://localhost:${PORT}/api/summary`);
      console.log(`🎓 Students CRUD API: http://localhost:${PORT}/api/students`);
      console.log(`=================================================`);
    });
  } catch (error) {
    console.error('Failed to start server due to DB connection failure:', error.message);
    process.exit(1);
  }
}

startServer();
