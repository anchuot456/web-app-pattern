const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { missingParameters, queryError } = require("../constants/statusCodes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    console.log("user created: ", user);

    res.status(201).send({ message: "user created successfully", user });
  } catch (err) {
    console.error("cannot create user: ", err);
    res.status(500).send({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(missingParameters)
      .send({ message: "Missing parameters" });
  } else {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(queryError).send({ message: "user doesn't exist" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(queryError).send({ message: "Incorrect password" });
    }

    req.session.user = {
      user_id: user.user_id,
    };

    const token = jwt.sign(
      {
        user: {
          id: user.user_id,
          email: user.email,
        },
      },
      process.env.JWT_SERECT_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({ data: { token } });
  }
};

module.exports = { register, login };
