const express = require("express");
const router = express.Router();
const eventService = require("../services/event.service");

router.get("/", eventService.getEvents);
router.post("/create", eventService.createEvent);

module.exports = router;
