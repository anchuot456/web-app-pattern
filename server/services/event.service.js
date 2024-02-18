const express = require("express");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const { queryError } = require("../constants/statusCodes");

const getEvents = async (req, res) => {
  const events = await Event.find()
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((error) => {
      res.status(queryError).send(error);
    });
};

const getEventById = async (req, res) => {
  const event_id = req.query.event_id;
  const event = await Event.findById(event_id)
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((error) => {
      res.status(queryError).send(error);
    });
};

const createEvent = async (req, res) => {
  const { name, date, location, description, responsible, participant } =
    req.body;
  const user = await User.findById(responsible);
  console.log("user", user);
  const participants = participant.split(",");
  let persons;
  await User.find({ name: { $in: participants } })
    .then((docs) => {
      persons = docs;
    })
    .catch((error) => {
      res.status(queryError).send(error);
    });

  console.log(persons);
  const event = new Event({
    name,
    date,
    location,
    description,
    responsible: user,
    participant: persons,
  });
  const newEvent = await event.save();
  res.status(201).send({ event: newEvent });
};

const deleteEventById = async (req, res) => {
  const event_id = req.body.event_id;
  console.log(req.body);
  const deletedEvent = await Event.findByIdAndDelete(event_id).catch(
    (error) => {
      res.status(queryError).send(error);
    }
  );
  console.log("deleted", deletedEvent);
  res.status(201).send(deletedEvent);
};

module.exports = { getEvents, getEventById, createEvent, deleteEventById };
