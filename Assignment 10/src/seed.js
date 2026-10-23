const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Student = require('./models/Student');
const dotenv = require('dotenv');

dotenv.config();

const sampleStudents = [
  {
    rollNumber: 'CS2024-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.edu',
    department: 'Computer Science',
    course: 'B.Tech',
    semester: 6,
    gpa: 9.6,
    attendance: 94,
    skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'TypeScript'],
  },
  {
    rollNumber: 'IT2024-002',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.edu',
    department: 'Information Technology',
    course: 'B.Tech',
    semester: 6,
    gpa: 9.4,
    attendance: 92,
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'AWS'],
  },
  {
    rollNumber: 'AI2024-003',
    name: 'Rohan Patel',
    email: 'rohan.patel@example.edu',
    department: 'Data Science & AI',
    course: 'B.Tech',
    semester: 4,
    gpa: 9.8,
    attendance: 98,
    skills: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'Python'],
  },
  {
    rollNumber: 'EC2024-004',
    name: 'Pooja Verma',
    email: 'pooja.verma@example.edu',
    department: 'Electronics & Communication',
    course: 'B.Tech',
    semester: 6,
    gpa: 8.7,
    attendance: 88,
    skills: ['Embedded C', 'IoT', 'MATLAB', 'VLSI'],
  },
  {
    rollNumber: 'ME2024-005',
    name: 'Siddharth Rao',
    email: 'siddharth.rao@example.edu',
    department: 'Mechanical Engineering',
    course: 'B.Tech',
    semester: 8,
    gpa: 8.2,
    attendance: 85,
    skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Robotics'],
  },
  {
    rollNumber: 'CS2024-006',
    name: 'Diya Sen',
    email: 'diya.sen@example.edu',
    department: 'Computer Science',
    course: 'M.Tech',
    semester: 2,
    gpa: 9.1,
    attendance: 90,
    skills: ['Distributed Systems', 'Kubernetes', 'Go', 'Redis'],
  },
  {
    rollNumber: 'EE2024-007',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@example.edu',
    department: 'Electrical Engineering',
    course: 'B.Tech',
    semester: 5,
    gpa: 7.9,
    attendance: 82,
    skills: ['Power Systems', 'Circuit Design', 'PLC', 'SCADA'],
  },
  {
    rollNumber: 'CE2024-008',
    name: 'Meera Deshmukh',
    email: 'meera.d@example.edu',
    department: 'Civil Engineering',
    course: 'B.Tech',
    semester: 7,
    gpa: 8.5,
    attendance: 91,
    skills: ['STAAD Pro', 'Revit', 'GIS', 'Project Management'],
  },
];

async function seedData() {
  try {
    await connectDB();
    console.log('Clearing existing students...');
    await Student.deleteMany({});

    console.log('Seeding sample student records...');
    const created = await Student.insertMany(sampleStudents);

    console.log(`✅ Successfully seeded ${created.length} student records!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error while seeding database:', error.message);
    process.exit(1);
  }
}

seedData();
