const bcrypt = require("bcrypt")
const User = require('../models/user');
const zod = require("zod");
const jwt = require("jsonwebtoken");

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
});

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

//Sign up 
exports.signup = async(req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
    
        const existingUser = await User.findOne({
            username: req.body.username
        })
    
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            })
        }
    
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userId = user._id;
    
        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET);
    
        res.json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
    }
}

//Sign in 
exports.signin = async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
    
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
    
        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, process.env.JWT_SECRET);
      
            res.json({
                token: token
            })
            return;
        }

    } catch (error) {
        console.error(error)

        return res.status(500).json({
          success: false,
          message: `Login Failure Please Try Again`,
        })
    }
}

// Update details 
exports.updateDetails = async (req, res) => {
    try {
        const { success } = updateBody.safeParse(req.body)
        console.log(req.body);
        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }
    
        await User.updateOne({ _id: req.userId }, { $set: req.body });
    
        res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
          success: false,
          message: `Couldn't update`,
        })
    }
}

// Search users using firstName and lastName 
exports.bulkSearch = async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })
    
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
          success: false,
          message: `No users found`,
        })
    }
}