const express = require("express");
const router = express.Router();
const eventService = require("../services/event.service");

router.get("/", eventService.getEvents);
router.get("/id", eventService.getEventById);
router.post("/create", eventService.createEvent);
router.post("/delete", eventService.deleteEventById);

module.exports = router;
