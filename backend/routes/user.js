const express = require("express")
const router = express.Router()

const { signup, signin, updateDetails, bulkSearch } = require('../controllers/user');
const { authMiddleware } = require('../middlewares/index');

// Route for user login
router.post("/signin", signin);

// Route for user signup
router.post("/signup", signup);

// Route for updating 
router.put("/update", authMiddleware, updateDetails);

// Router for searching
router.get("/bulk", bulkSearch)


module.exports = router;