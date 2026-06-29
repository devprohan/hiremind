const User = require("../Models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validation
        if (!(fullName, email, password)) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "user already exists",
            });
        }

        //  Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            fullName,
            email,
            password: hashPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email, password)) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "invalid email or password",
            });
        }

        // compare password
        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid email or password",
            });
        }

        // Generate JWtT Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {
    registerUser,
    loginUser,
};
