const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const employeeRouter = require("./routes/employee.route");
const attendanceRouter = require("./routes/attendance.route")
const leaveRouter = require("./routes/leave.route");
const salaryRouter = require("./routes/salary.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/salary", salaryRouter );

module.exports = app;