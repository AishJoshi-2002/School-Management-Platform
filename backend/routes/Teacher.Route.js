const express = require('express');
const router = express.Router();

const { createTeacher, getTeacher, deleteTeacher, updateTeacher } = require('../controllers/Teacher.Controller');
const authenticateJWT = require('../middleware/Auth.Middleware');

router.post("/", authenticateJWT, createTeacher);

router.get("/", getTeacher);

router.delete("/:id", authenticateJWT, deleteTeacher);

router.put("/:id", authenticateJWT, updateTeacher);

module.exports = router;