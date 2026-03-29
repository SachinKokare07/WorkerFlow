const salaryModel = require("../models/salary.model");
const employeeModel = require("../models/employee.model");
const attendanceModel = require("../models/attendance.model");

async function calculateSalary(req, res) {
  try {

    const { employeeId, month, year } = req.body;

    const employee = await employeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    if (employee.employerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const attendanceRecords = await attendanceModel.find({
      employeeId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1)
      }
    });

    const presentDays = attendanceRecords.filter(
      record => record.status === "present"
    ).length;

    const totalDays = new Date(year, month, 0).getDate();

    const dailySalary = employee.salary / totalDays;

    const salaryAmount = Math.round(presentDays * dailySalary);

    const salary = await salaryModel.create({
      employeeId,
      employerId: req.user.id,
      month,
      year,
      presentDays,
      totalDays,
      salaryAmount
    });

    res.status(201).json({
      message: "Salary calculated successfully",
      salary
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}

module.exports = { calculateSalary };