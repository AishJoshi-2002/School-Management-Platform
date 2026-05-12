const express = require("express");
const router = express.Router();

const User = require("../models/User.Model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Route
// Post
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Login Route
// Post
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: existingUser._id, email: existingUser.email, name: existingUser.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return res.status(201).json({ message: "User logged in successfully", token, user: { id: existingUser._id, name: existingUser.name, email: existingUser.email } });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;