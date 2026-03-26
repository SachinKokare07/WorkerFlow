const { get } = require('mongoose');
const attendanceModel = require('../models/attendance.model');
const employeeModel = require('../models/employee.model');

async function markAttendance(req, res) {
  try {

    const { employeeId, date, status } = req.body;

    const employee = await employeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: "Employee doesn't exist"
      });
    }

    if (employee.employerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const isAttendanceMarked = await attendanceModel.findOne({
      employeeId,
      date
    });

    if (isAttendanceMarked) {
      return res.status(409).json({
        message: "Attendance already marked for this date"
      });
    }

    const attendance = await attendanceModel.create({
      employeeId,
      employerId: req.user.id,
      date,
      status
    });

    return res.status(201).json({
      message: "Attendance marked successfully",
      attendance
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
}

async function getAttendanceByEmployee(req,res) {
  try{
    const {employeeId} = req.params;
    const employee = await employeeModel.findById(employeeId);
    if(!employee){
      return res.status(404).json({
        message : "employee doesn't exist"
      })
    }
    if(employee.employerId.toString()!==req.user.id){
      return res.status(403).json({
        message : "Access denied"
      })
    }
    const attendance = await attendanceModel.find({employeeId}).sort({date : -1});
    
    res.status(201).json({
      attendance
    })

  }
  catch(err){
    return res.status(500).json({
      message : "Server Error",
      error : err.message
    })
  }
  
}
module.exports = { markAttendance, getAttendanceByEmployee };