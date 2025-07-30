import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
import admin from "../models/admin.model.js";


// signup ==>
export const signup = async (req, res) => {

    const { fullName, email, password, phone } = req.body;

    try {

        if (!fullName || !email || !password || !phone) {
            return res.status(500).json({ message: "All fields should be filled" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "message should be atleast six characters" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            phone:phone,

        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({ message: 'User signed up successfully', user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } });
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json({ message: "Internal server error" })
    }
};

// login ==>>

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({ message: 'User logged in successfully', user: { id: user._id, fullName: user.fullName, email: user.email, role: "user" } })
    } catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
// admin log in

export const adminLogIn = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({ message: 'Admin logged in successfully', user: { id: user._id, fullName: user.fullName, email: user.email, role: "admin" } })
    } catch (error) {
        console.log("error in Admin login controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

// admin sign up ==>

export const adminSignUp = async (req, res) => {

    const { fullName, email, password } = req.body;

    try {

        if (!fullName || !email || !password) {
            return res.status(500).json({ message: "All fields should be filled" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "message should be atleast six characters" });
        }

        const Admin = await admin.findOne({ email });

        if (Admin) {
            return res.status(400).json({ message: "Admin already exists" })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new admin({
            fullName: fullName,
            email: email,
            password: hashedPassword,

        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({ message: 'Admin signed up successfully', Admin: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json({ message: "Internal server error" })
    }
};
// logout == >

export const logout = (req, res) => {

    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// check auth

export const checkAuth = async (req, res) => {
    try {

        if (req.user || req.role){
            res.status(200).json({
                user: req.user,
                role: req.role,
            });
        }
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
