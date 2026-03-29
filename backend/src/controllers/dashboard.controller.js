const attendanceModel = require("../models/attendance.model");
const employeeModel = require("../models/employee.model");
const leaveModel = require("../models/leave.model");
async function getDashboard(req,res) {
  try{
    const employerId = req.params.id;

    const totalEmployees = await employeeModel.countDocuments({
      employerId
    });

    const today = new Date();
    today.setHours(0,0,0,0);

    const presentToday = await attendanceModel.countDocuments({
      employerId,
      date : today,
       status : "present"
    });

    const absentToday = await attendanceModel.countDocuments({
      employerId,
      date : today,
      status : 'absent'
    });

    const pendingLeaves = await leaveModel.countDocuments({
      employerId,
      status: "pending"
    });

    res.status(200).json({
      totalEmployees,
      presentToday,
      absentToday,
      pendingLeaves
    });
  }
  catch(err){
    return res.status(500).json({
      message : " Server Error",
      error  : err.message
    })
  }
}

module.exports = {getDashboard};