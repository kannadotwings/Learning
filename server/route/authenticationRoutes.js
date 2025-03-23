const express = require("express");
const AuthenticationController = require("../controller/authenticationController");

const router = express.Router();

router.post("/login", AuthenticationController.Login);
router.post("/register", AuthenticationController.Register);

module.exports = router;
