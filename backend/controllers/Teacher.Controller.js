const Teacher = require('../models/Teacher.Model');

exports.createTeacher = async (req, res) => {
    try {
        const { name, subject, designation, bio, image } = req.body;
        if (!name || !subject || !designation || !bio || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newTeacher = new Teacher ({
            name, subject, designation, bio, image
        })
        await newTeacher.save();
        return res.status(201).json({ message: 'Teacher created successfully', Teacher: newTeacher });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTeacher = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        if (!teachers || teachers.length === 0) {
            return res.status(404).json({ message: 'No Teachers found' });
        }
        return res.status(200).json({status: "Y", data: teachers});
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const id = req.params.id;
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        return res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, subject, designation, bio, image } = req.body;
        if (!name || !subject || !designation || !bio || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, subject, designation, bio, image });
        if (updatedTeacher) {
            return res.status(200).json({ message: 'Teacher updated successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};