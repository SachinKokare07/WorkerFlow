const express = require('express');
const salaryController = require("../controllers/salary.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/calculate',authMiddleware,salaryController.calculateSalary);
router.get('/:id',authMiddleware,salaryController.getSalaryHistory);
module.exports = router;