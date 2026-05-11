const express = require('express');
const router = express.Router();

const { createUser, getUser, deleteUser, updateUser } = require('../controllers/User.Controller');

router.post("/", createUser);

router.get("/", getUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

module.exports = router;