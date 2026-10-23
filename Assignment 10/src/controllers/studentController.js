const Student = require('../models/Student');

/**
 * @desc    Create a new student record
 * @route   POST /api/students
 * @access  Public
 */
exports.createStudent = async (req, res) => {
  try {
    const {
      rollNumber,
      name,
      email,
      department,
      course,
      semester,
      gpa,
      attendance,
      skills,
    } = req.body;

    // Check if roll number or email already exists
    const existingStudent = await Student.findOne({
      $or: [
        { rollNumber: rollNumber ? rollNumber.toUpperCase() : '' },
        { email: email ? email.toLowerCase() : '' },
      ],
    });

    if (existingStudent) {
      const duplicateField =
        existingStudent.rollNumber === rollNumber?.toUpperCase()
          ? 'Roll Number'
          : 'Email';
      return res.status(409).json({
        success: false,
        message: `Student with this ${duplicateField} already exists.`,
      });
    }

    const newStudent = await Student.create({
      rollNumber,
      name,
      email,
      department,
      course,
      semester,
      gpa,
      attendance,
      skills: Array.isArray(skills)
        ? skills
        : typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully!',
      data: newStudent,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error while creating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all students with filtering, search, sorting & pagination
 * @route   GET /api/students
 * @access  Public
 */
exports.getAllStudents = async (req, res) => {
  try {
    const {
      search,
      department,
      course,
      minGpa,
      maxGpa,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // Search by name or roll number
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by department
    if (department && department !== 'All') {
      query.department = department;
    }

    // Filter by course
    if (course && course !== 'All') {
      query.course = course;
    }

    // Filter by GPA range
    if (minGpa || maxGpa) {
      query.gpa = {};
      if (minGpa) query.gpa.$gte = Number(minGpa);
      if (maxGpa) query.gpa.$lte = Number(maxGpa);
    }

    const sortOptions = {};
    const sortDirection = order === 'asc' ? 1 : -1;
    sortOptions[sortBy] = sortDirection;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [students, total] = await Promise.all([
      Student.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
      Student.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching students',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single student by MongoDB _id or Roll Number
 * @route   GET /api/students/:id
 * @access  Public
 */
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    let student = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      student = await Student.findById(id);
    }

    if (!student) {
      student = await Student.findOne({ rollNumber: id.toUpperCase() });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with ID or Roll Number: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching student details',
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing student by ID or Roll Number
 * @route   PUT /api/students/:id
 * @access  Public
 */
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = id;
    } else {
      query.rollNumber = id.toUpperCase();
    }

    const updateData = { ...req.body };

    if (updateData.skills && typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (updateData.rollNumber) {
      updateData.rollNumber = updateData.rollNumber.toUpperCase();
    }

    const updatedStudent = await Student.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student not found with ID or Roll Number: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully!',
      data: updatedStudent,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate key error: Roll Number or Email already exists in another record.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error while updating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a student record by ID or Roll Number
 * @route   DELETE /api/students/:id
 * @access  Public
 */
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    let query = {};

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = id;
    } else {
      query.rollNumber = id.toUpperCase();
    }

    const deletedStudent = await Student.findOneAndDelete(query);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student not found with ID or Roll Number: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Student ${deletedStudent.name} (${deletedStudent.rollNumber}) deleted successfully!`,
      data: {
        id: deletedStudent._id,
        rollNumber: deletedStudent.rollNumber,
        name: deletedStudent.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error while deleting student',
      error: error.message,
    });
  }
};
