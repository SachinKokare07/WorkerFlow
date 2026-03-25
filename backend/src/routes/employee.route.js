const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const employeeController = require("../controllers/employee.controller");

const router = express.Router();

router.post("/", authMiddleware, employeeController.createEmployee);
router.get("/", authMiddleware, employeeController.getEmployees);
router.get("/:id", authMiddleware, employeeController.getEmployeeById);
router.patch("/:id",authMiddleware, employeeController.updateEmployee);
router.delete("/:id",authMiddleware, employeeController.deleteEmployee);

module.exports = router;