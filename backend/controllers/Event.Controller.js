const Event = require('../models/Event.Model');

exports.createEvent = async (req, res) => {
    try {
        const { title, description, shortDescription, date, location } = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newEvent = new Event ({
            title, description, shortDescription, date, location
        })
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }
        return res.status(200).json({status: "Y", data: events});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, shortDescription, date, location } = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const updatedEvent = await Event.findByIdAndUpdate(id, { title, description, shortDescription, date, location });
        if (updatedEvent) {
            res.status(200).json({ message: 'Event updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};