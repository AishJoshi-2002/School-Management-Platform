const express = require('express');
const router = express.Router();

const { createEvent, getEvent, deleteEvent, updateEvent } = require('../controllers/Event.Controller');
const authenticateJWT = require('../middleware/Auth.Middleware');

router.post("/", authenticateJWT, createEvent);

router.get("/", getEvent);

router.delete("/:id", authenticateJWT, deleteEvent);

router.put("/:id", authenticateJWT, updateEvent);

module.exports = router;