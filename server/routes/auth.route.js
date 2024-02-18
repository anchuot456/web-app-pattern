const express = require("express");
const router = express.Router();

const authService = require("../services/auth.service");

router.post("/register", authService.register);
router.post("/login", authService.login);
router.post("/logout", authService.logout);
router.post("/refresh", authService.refreshAuth);
router.post("/changepassword", authService.changePassword);

module.exports = router;
