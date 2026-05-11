const express = require('express');
const router = express.Router();

const { createNotice, getNotice, deleteNotice, updateNotice } = require('../controllers/Notice.Controller');

router.post("/", createNotice);

router.get("/", getNotice);

router.delete("/:id", deleteNotice);

router.put("/:id", updateNotice);

module.exports = router;