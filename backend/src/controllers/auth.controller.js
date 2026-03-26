const employerModel = require("../models/employer.model");
const employeeModel = require("../models/employee.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {

    const { name, email, password, companyName } = req.body;

    const isUserAlreadyExist = await employerModel.findOne({ email });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const employer = await employerModel.create({
      name,
      email,
      password: hash,
      companyName,
      role: "employer"
    });

    const token = jwt.sign(
      {
        id: employer._id,
        role: employer.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    const { password: _, ...safeEmployer } = employer.toObject();
    
    res.status(201).json({
      message: "User registered successfully",
      employer : safeEmployer
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    let user = await employerModel.findOne({ email });

    if (!user) {
      user = await employeeModel.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true });
    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user : safeUser
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}
module.exports = {registerUser, loginUser}