const express = require("express");
const router = express.Router();
const taskService = require("../services/task.service");

router.get("/", taskService.getTasksByUserId);
router.get("/all", taskService.getTasks);
router.post("/create", taskService.createTask);

module.exports = router;
