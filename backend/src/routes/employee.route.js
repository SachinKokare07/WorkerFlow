const express = require("express");
const employeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, employeeController.createEmployee);

module.exports = router;