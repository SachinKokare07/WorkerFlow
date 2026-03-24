const employeeModel = require("../models/employee.model");
const bcrypt = require("bcryptjs");

async function createEmployee(req, res) {
  try {

    const { name, email, password, position, salary } = req.body;

    const existingEmployee = await employeeModel.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await employeeModel.create({
      name,
      email,
      password: hashedPassword,
      position,
      salary,
      role: "employee",
      employerId: req.user.id
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}

module.exports = { createEmployee };