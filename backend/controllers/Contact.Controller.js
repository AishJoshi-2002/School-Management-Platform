// for db related actions

const Contact = require('../models/Contact.Model.js');

exports.createContact = async (req, res) => {
    try {
        const {name, email, phone, subject, message} = req.body;
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({status: "N", error: "All fields are required"});
        }
        const newContact = new Contact({
            name, email, phone, subject, message
        })
        await newContact.save(); // saves the data to the database
        return res.status(201).json({status: "Y", message: "Thank You for contacting us. We will get back to you soon."})
    } catch (error) {
        console.error("Error in createContact:", error);
        return res.status(500).json({status: "N", error: `Internal Server Error: ${error.message}`});
    }
}

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(400).json({status: "Y", error: "No contacts found"});
        }
        return res.status(200).json({status: "Y", data: contacts});
    } catch (error) {
        console.error("Error in getContacts:", error);
        return res.status(500).json({status: "N", error: `Internal Server Error: ${error.message}`});
    }
}

exports.deleteContact = async (req, res) => {
    let id = req.params.id;
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(400).json({status: "Y", error: "Contact not found"});
        }
        return res.status(200).json({status: "Y", message: "Contact deleted successfully"});
    } catch (error) {
        console.error("Error in deleteContact:", error);
        return res.status(500).json({status: "N", error: `Internal Server Error: ${error.message}`});
    }
};