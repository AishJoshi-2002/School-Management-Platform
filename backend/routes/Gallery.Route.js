const express = require('express');
const router = express.Router();

const { createGallery, getGallery, deleteGallery, updateGallery } = require('../controllers/Gallery.Controller');
const authenticateJWT = require('../middleware/Auth.Middleware');

router.post("/", authenticateJWT, createGallery);

router.get("/", getGallery);

router.delete("/:id", authenticateJWT, deleteGallery);

router.put("/:id", authenticateJWT, updateGallery);

module.exports = router;