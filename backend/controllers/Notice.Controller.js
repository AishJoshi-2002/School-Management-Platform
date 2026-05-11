const Notice = require('../models/Notice.Model');

exports.createNotice = async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newNotice = new Notice ({
            title, description, date, category
        })
        await newNotice.save();
        res.status(201).json({ message: 'Notice created successfully', Notice: newNotice });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getNotice = async (req, res) => {
    try {
        const notices = await Notice.find();
        if (!notices || notices.length === 0) {
            return res.status(404).json({ message: 'No Notices found' });
        }
        return res.status(200).json({status: "Y", data: notices});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteNotice = async (req, res) => {
    try {
        const id = req.params.id;
        const notice = await Notice.findByIdAndDelete(id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateNotice = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, date, category } = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const notice = await Notice.findById(id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        const updatedNotice = await Notice.findByIdAndUpdate(id, { title, description, date, category });
        if (updatedNotice) {
            res.status(200).json({ message: 'Notice updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};