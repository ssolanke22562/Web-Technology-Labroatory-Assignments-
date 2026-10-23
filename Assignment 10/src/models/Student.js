const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9_-]+$/, 'Roll number must contain only alphanumeric characters, dashes, or underscores'],
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: {
        values: [
          'Computer Science',
          'Information Technology',
          'Electronics & Communication',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electrical Engineering',
          'Data Science & AI',
        ],
        message: '{VALUE} is not a supported department',
      },
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      enum: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'B.Sc', 'M.Sc'],
      default: 'B.Tech',
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required'],
      min: [1, 'Semester must be at least 1'],
      max: [8, 'Semester cannot exceed 8'],
      default: 5,
    },
    gpa: {
      type: Number,
      required: [true, 'GPA is required'],
      min: [0.0, 'GPA cannot be less than 0.0'],
      max: [10.0, 'GPA cannot exceed 10.0'],
    },
    attendance: {
      type: Number,
      min: [0, 'Attendance cannot be less than 0%'],
      max: [100, 'Attendance cannot exceed 100%'],
      default: 85,
    },
    skills: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Performance Category virtual
studentSchema.virtual('performanceCategory').get(function () {
  if (this.gpa >= 9.0) return 'Outstanding (O)';
  if (this.gpa >= 8.0) return 'Excellent (A+)';
  if (this.gpa >= 7.0) return 'Very Good (A)';
  if (this.gpa >= 6.0) return 'Good (B+)';
  if (this.gpa >= 5.0) return 'Average (B)';
  return 'Needs Improvement';
});

// Indexes for fast lookup and sorting
studentSchema.index({ gpa: -1 });
studentSchema.index({ department: 1 });
studentSchema.index({ name: 'text', rollNumber: 'text' });

// Prevent model recompilation in serverless environments
module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
