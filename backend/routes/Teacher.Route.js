const express = require('express');
const router = express.Router();

const { createTeacher, getTeacher, deleteTeacher, updateTeacher } = require('../controllers/Teacher.Controller');

router.post("/", createTeacher);

router.get("/", getTeacher);

router.delete("/:id", deleteTeacher);

router.put("/:id", updateTeacher);

module.exports = router;