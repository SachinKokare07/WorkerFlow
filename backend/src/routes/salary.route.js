const express = require('express');
const salaryController = require("../controllers/salary.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/calculate',authMiddleware,salaryController.calculateSalary);

module.exports = router;