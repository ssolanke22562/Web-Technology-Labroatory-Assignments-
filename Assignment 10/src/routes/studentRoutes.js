const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const summaryController = require('../controllers/summaryController');

// Summary & analytics route (must be before /:id to avoid param collision)
router.get('/summary', summaryController.getStudentSummary);
router.get('/stats', summaryController.getStudentSummary);

// CRUD Routes for Students
router.route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router.route('/:id')
  .get(studentController.getStudentById)
  .put(studentController.updateStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
