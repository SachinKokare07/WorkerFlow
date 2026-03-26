const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const attendanceController = require('../controllers/attendance.controller');

const router = express.Router();

router.post('/', authMiddleware, attendanceController.markAttendance);
router.get('/:employeeId',authMiddleware,attendanceController.getAttendanceByEmployee);

module.exports = router;
