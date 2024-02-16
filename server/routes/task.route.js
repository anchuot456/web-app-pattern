const express = require("express");
const router = express.Router();
const taskService = require("../services/task.service");

router.get("/", taskService.getTasksById);
router.post("/create", taskService.createTask);

module.exports = router;
