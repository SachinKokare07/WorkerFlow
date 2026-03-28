const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const leaveController = require('../controllers/leave.controller');

const router = express.Router();

router.post('/', authMiddleware, leaveController.requestLeave);
router.get('/',authMiddleware,leaveController.getLeaves);
router.patch('/:id',authMiddleware,leaveController.updateLeaveStatus);

module.exports = router;