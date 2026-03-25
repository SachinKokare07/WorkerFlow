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

async function getEmployees(req,res) {
  try{
    const employees = await employeeModel.find({
      employerId : req.user.id
    })
    res.status(200).json({
      employee : employees
    });
  }
  catch(err){
    res.status(500).json({
      message : "Server error",
      error : err.message
    })
  }
}

async function getEmployeeById(req,res) {
    try{
    const employee = await employeeModel.findById(req.params.id);
    if(!employee){
      return res.status(403).json({
        message : "Not employee present"
      })
    }
    if(employee.employerId.toString() !== req.user.id){
      return res.status(409).json({
        message : "Acess denied"
      })
    }
    res.status(200).json({
      employee : employee
    })
  }
  catch(err){
    return res.status(500).json({
      message : "Server error",
      error : err.message
    })
  }
}

async function updateEmployee(req,res) {
  try{
    const employee = await employeeModel.findById(req.params.id);
    if(!employee){
      return res.status(404).json({
        message : "User not found"
      })
    }
    if(employee.employerId.toString() !== req.user.id){
      return res.status(403).json({
        message: "Access denied"
      });
    }
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {returnDocument: "after"}
    ).select("-password");
    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee
    });
  }
  catch(err){
    return res.status(500).json({
      message : "Server error",
      error : err.message
    })
  }
  
}

async function deleteEmployee(req,res) {
  try{  
    const employee = await employeeModel.findById(req.params.id);
    if(!employee){
      return res.status(404).json({
        message : "Employee Not Found "
      })
    }
    if(employee.employerId.toString()!== req.user.id){
      return res.status(403).json({
        message: "Access denied"
      })
    }
    const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message : "Employee deleted sucessfully",
      deletedEmployee : deletedEmployee
    })
  }
  catch(err){
    return res.status(500).json({
      message : "Server error",
      error : err.message
    })
  }
}
module.exports = { createEmployee,getEmployees,getEmployeeById,updateEmployee,deleteEmployee };