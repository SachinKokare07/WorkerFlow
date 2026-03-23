const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  position: {
    type: String
  },

  salary: {
    type: Number
  },

  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true
  },

  role: {
    type: String,
    default: "employee"
  }

},{timestamps:true});

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;