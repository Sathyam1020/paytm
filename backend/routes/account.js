const express = require("express")
const router = express.Router();

const { getBalance, transfer } = require("../controllers/account");
const { authMiddleware } = require('../middlewares/index');

router.get('/balance', authMiddleware, getBalance);
router.post('/transfer', authMiddleware, transfer);

module.exports = router;