const express = require("express");
const User = require("../models/user.model");

const getUser = async (req, res) => {
  const user_id = req.query.user_id;
  const user = await User.findById(user_id);
  res.status(200).send(user);
};

module.exports = { getUser };
