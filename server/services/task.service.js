const express = require("express");
const Task = require("../models/task.model");
const User = require("../models/user.model");
const Event = require("../models/event.model");

const getTasksById = async (req, res) => {
  const user_id = req.query.user_id;
  const user = await User.findById(user_id);
  const tasks = await Task.find({ assignee: user });
  res.status(200).send(tasks);
};

const createTask = async (req, res) => {
  const { title, description, status, deadline, event, assignee } = req.data;
  const eventDoc = await Event.find({ name: event });
  const user = await User.find({ name: assignee });
  const newTask = new Task({
    title,
    description,
    status,
    deadline,
    event: eventDoc,
    assignee: user,
  });

  const taskDoc = await newTask.save();
  res.status(201).send({ task: taskDoc });
};

module.exports = { getTasksById, createTask };
