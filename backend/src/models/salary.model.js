const mongoose = require('mongoose');

const salarySchema  = mongoose.Schema({
  employeeId:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required :true
  },
  employerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Employer',
    required  : true
  },
  month : {
    type: Number,
    required : true
  },
  year : {
    type : Number,
    required : true
  },
  presentDays : {
    type : Number,
    required : true
  },
  totalDays : {
    type : Number,
    required : true
  },
  salaryAmount : {
    type: Number,
    required : true
  }

},{
  timestamps : true,
  versionkey : true
});

const salaryModel = mongoose.model('Salary', salarySchema);

module.exports = salaryModel;