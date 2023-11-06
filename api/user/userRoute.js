const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')

//user controllers
const { register, login, check } = require("../../controller/userController");

// regiister routes
router.post("/register", register);
//login routes
router.post("/login", login);
//check user
router.get("/check",auth ,check);

module.exports = router; 