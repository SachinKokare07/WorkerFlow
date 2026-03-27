const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
{
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true
  },

  fromDate: {
    type: Date,
    required: true
  },

  toDate: {
    type: Date,
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

},
{
  timestamps: true,
  versionKey: false
}
);

const leaveModel = mongoose.model("Leave", leaveSchema);

module.exports = leaveModel;