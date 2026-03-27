const employeeModel = require("../models/employee.model");
const leaveModel = require("../models/leave.model");

async function requestLeave(req,res) {
  try{
    const {employeeId, fromDate, toDate, reason} = req.body;
    const employee = await employeeModel.findById(employeeId);
    if(!employee){
      return res.status(404).json({
        message : "Employee doesn't exist"
      })
    }
    if(employee.employerId.toString()!== req.user.id){
      return res.status(403).json({
        message : "Access Denied"
      })
    }
    if( new Date(fromDate) > new Date(toDate)){
      return res.status(400).json({
        message : "Invalid dates"
      })
    }
    const leave = await leaveModel.create({
      employeeId,
      employerId : req.user.id,
      fromDate,
      toDate,
      reason
    })
    res.status(201).json({
      message : "Leave requested successfully",
      leave : leave
    })
    
  }
  catch(err){
    return res.status(500).json({
      message : "Server error",
      error : err.message
    })
  }
}

async function getLeaves(req,res) {
  try{
    const leave = await leaveModel.find({employerId : req.user.id})
    .populate("employeeId", "name email position")
    .sort({createdAt : -1});

    res.status(201).json({
      leave
    })
  }
  catch(err){
    return res.status(500).json({
      message : "Server Error",
      error : err.message
    })
  }
  
}

module.exports = {requestLeave,getLeaves};