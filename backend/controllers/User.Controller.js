const User = require('../models/User.Model');

exports.createUser = async (req, res) => {
    try {
        const { title, description, shortDescription, date, location } = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newUser = new User ({
            title, description, shortDescription, date, location
        })
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', User: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({status: "Y", data: users});
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, shortDescription, date, location } = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(id, { title, description, shortDescription, date, location });
        if (updatedUser) {
            return res.status(200).json({ message: 'User updated successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};