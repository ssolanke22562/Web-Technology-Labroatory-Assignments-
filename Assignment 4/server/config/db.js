const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.warn('⚠️ MONGODB_URI is not set in environment variables. Database features will run in fallback mode.');
      return false;
    }
    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not crash the app so REST server can still respond with descriptive errors/fallback data
    return false;
  }
};

module.exports = connectDB;
