const express = require('express');
const router = express.Router();

const { createContact, getContacts, deleteContact } = require('../controllers/Contact.Controller.js');
const authenticateJWT = require('../middleware/Auth.Middleware.js');

router.post("/", createContact);

router.get("/", authenticateJWT, getContacts);

router.delete("/:id", authenticateJWT, deleteContact);

module.exports = router;