const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");

router.get("/", userService.getUser);

module.exports = router;
