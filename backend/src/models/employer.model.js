const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({

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
    required: true,
    
  },

  companyName: {
    type: String
  },

  role: {
    type: String,
    default: "employer"
  }

},{timestamps:true});

const employerModel = mongoose.model("Employer", employerSchema)

module.exports = employerModel