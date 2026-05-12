const express = require('express');
const router = express.Router();

const { createNotice, getNotice, deleteNotice, updateNotice } = require('../controllers/Notice.Controller');
const authenticateJWT = require('../middleware/Auth.Middleware');

router.post("/", authenticateJWT, createNotice);

router.get("/", getNotice);

router.delete("/:id", authenticateJWT, deleteNotice);

router.put("/:id", authenticateJWT, updateNotice);

module.exports = router;