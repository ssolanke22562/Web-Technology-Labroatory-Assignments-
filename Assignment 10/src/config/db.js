const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_portal';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, memoryServer: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 45000,
    };

    cached.promise = (async () => {
      try {
        const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
        console.log(`✅ MongoDB Connected to: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      } catch (err) {
        // If local MongoDB instance is not available and running in local development
        const isLocalHost = MONGODB_URI.includes('127.0.0.1') || MONGODB_URI.includes('localhost');
        if (isLocalHost && !process.env.VERCEL && !process.env.NETLIFY) {
          console.warn('⚠️  Local MongoDB service not detected on port 27017.');
          console.log('🔄 Initializing embedded in-memory MongoDB instance for seamless testing...');
          try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            cached.memoryServer = mongod;
            MONGODB_URI = uri;
            const memoryMongoose = await mongoose.connect(uri, opts);
            console.log(`✅ Embedded In-Memory MongoDB running & connected at: ${uri}`);

            // Automatically auto-seed initial students into memory database
            const Student = require('../models/Student');
            const studentCount = await Student.countDocuments();
            if (studentCount === 0) {
              console.log('🌱 Auto-populating sample student records...');
              const initialData = [
                { rollNumber: 'CS2024-001', name: 'Aarav Sharma', email: 'aarav.sharma@example.edu', department: 'Computer Science', course: 'B.Tech', semester: 6, gpa: 9.6, attendance: 94, skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'TypeScript'] },
                { rollNumber: 'IT2024-002', name: 'Ananya Iyer', email: 'ananya.iyer@example.edu', department: 'Information Technology', course: 'B.Tech', semester: 6, gpa: 9.4, attendance: 92, skills: ['Python', 'FastAPI', 'PostgreSQL', 'AWS'] },
                { rollNumber: 'AI2024-003', name: 'Rohan Patel', email: 'rohan.patel@example.edu', department: 'Data Science & AI', course: 'B.Tech', semester: 4, gpa: 9.8, attendance: 98, skills: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision'] },
                { rollNumber: 'EC2024-004', name: 'Pooja Verma', email: 'pooja.verma@example.edu', department: 'Electronics & Communication', course: 'B.Tech', semester: 6, gpa: 8.7, attendance: 88, skills: ['Embedded C', 'IoT', 'MATLAB', 'VLSI'] },
                { rollNumber: 'ME2024-005', name: 'Siddharth Rao', email: 'siddharth.rao@example.edu', department: 'Mechanical Engineering', course: 'B.Tech', semester: 8, gpa: 8.2, attendance: 85, skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Robotics'] },
                { rollNumber: 'CS2024-006', name: 'Diya Sen', email: 'diya.sen@example.edu', department: 'Computer Science', course: 'M.Tech', semester: 2, gpa: 9.1, attendance: 90, skills: ['Distributed Systems', 'Kubernetes', 'Go', 'Redis'] },
                { rollNumber: 'EE2024-007', name: 'Vikram Mehta', email: 'vikram.mehta@example.edu', department: 'Electrical Engineering', course: 'B.Tech', semester: 5, gpa: 7.9, attendance: 82, skills: ['Power Systems', 'Circuit Design', 'PLC'] },
                { rollNumber: 'CE2024-008', name: 'Meera Deshmukh', email: 'meera.d@example.edu', department: 'Civil Engineering', course: 'B.Tech', semester: 7, gpa: 8.5, attendance: 91, skills: ['STAAD Pro', 'Revit', 'GIS'] }
              ];
              await Student.insertMany(initialData);
              console.log('✅ Sample students populated successfully.');
            }

            return memoryMongoose;
          } catch (memErr) {
            console.error('❌ Failed to initialize in-memory MongoDB:', memErr.message);
            throw memErr;
          }
        }
        console.error('❌ MongoDB Connection Error:', err.message);
        throw err;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;
