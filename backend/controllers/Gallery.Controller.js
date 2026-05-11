const Gallery = require('../models/Gallery.Model');

exports.createGallery = async (req, res) => {
    try {
        const { title, imageUrl,  date } = req.body;
        if (!title || !imageUrl || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newGallery = new Gallery ({
            title, imageUrl, date
        })
        await newGallery.save();
        res.status(201).json({ message: 'Gallery created successfully', Gallery: newGallery });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        if (!gallery || gallery.length === 0) {
            return res.status(404).json({ message: 'No Images found' });
        }
        return res.status(200).json({status: "Y", data: gallery});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteGallery = async (req, res) => {
    try {
        const id = req.params.id;
        const gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateGallery = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, imageUrl,  date } = req.body;
        if (!title || !imageUrl || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const updatedGallery = await Gallery.findByIdAndUpdate(id, { title, imageUrl, date });
        if (updatedGallery) {
            res.status(200).json({ message: 'Gallery updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};