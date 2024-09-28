const { UserModel } = require("../models/userModel")
const validator = require('validator');
const bcrypt = require('bcrypt');
const { createToken } = require("../helpers/authhelper");
const jwt = require("jsonwebtoken")
require("dotenv").config()




//Route for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.status(200).json({ success: true, message: 'Logged in successfully!!', token })
        } else {
            res.status(400).json({ success: false, message: 'Invalid Credentials!!' })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message || 'Something went wrong..' })
    }
}

//Route for user register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        //checking user already exists or not
        const exists = await UserModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //validating email & password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter valid email" })
        }

        if (!validator.isStrongPassword(password, { minLength: 6 })) {
            return res.status(400).json({ success: false, message: "Please enter strong password" })
        }

        //hashing your password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //registering new user
        const newUser = await UserModel({ name, email, password: hashedPassword })
        const user = await newUser.save()

        res.status(200).json({ success: true, message: 'User registered successfully!!' })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message || 'Something went wrong..' })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(
                { email, role: 'admin' },  // Payload
                process.env.JWT_SECRET,    // Secret key
            );

            return res.status(200).json({ success: true, token });

        } else {
            return res.status(400).json({ success: false, message: 'Invalid Credentials..' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message || 'Something went wrong..' });
    }
};

module.exports = {
    loginUser,
    registerUser,
    adminLogin
}