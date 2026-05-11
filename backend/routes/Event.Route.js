const express = require('express');
const router = express.Router();

const { createEvent, getEvent, deleteEvent, updateEvent } = require('../controllers/Event.Controller');

router.post("/", createEvent);

router.get("/", getEvent);

router.delete("/:id", deleteEvent);

router.put("/:id", updateEvent);

module.exports = router;