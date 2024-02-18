const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const {
  missingParameters,
  queryError,
  unauthorized,
} = require("../constants/statusCodes");
const jwt = require("jsonwebtoken");
const {
  generateToken,
  saveToken,
  verifyToken,
  deleteToken,
} = require("./token.service");
const { tokenTypes } = require("../config/tokens");
const logger = require("../middleware/winston");
const { Types } = require("mongoose");

require("dotenv");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email, // this is the equivalent of writing email: email
      name,
      password: hashedPassword,
    });
    const newUser = await user.save();
    console.log("user created: ", newUser);

    res.status(201).send({ message: "user created successfully", newUser });
  } catch (err) {
    //console.error("cannot create user: ", err);
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
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(queryError).send({ message: "user doesn't exist" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(queryError).send({ message: "Incorrect password" });
    }

    req.session.user = {
      _id: user._id,
    };

    const accessTokenExp = moment().add(
      process.env.JWT_ACCESS_TOKEN_EXP,
      "minutes"
    );
    const refreshTokenExp = moment().add(
      process.env.JWT_REFRESH_TOKEN_EXP,
      "days"
    );

    const accessToken = generateToken(
      user._id,
      accessTokenExp,
      tokenTypes.ACCESS
    );
    const refreshToken = generateToken(
      user._id,
      refreshTokenExp,
      tokenTypes.REFRESH
    );

    saveToken(accessToken, user._id, accessTokenExp, tokenTypes.ACCESS);
    saveToken(refreshToken, user._id, refreshTokenExp, tokenTypes.REFRESH);

    return res.status(200).send({ user, accessToken, refreshToken });
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.body, req.headers);
    const accessToken = req.headers.authorization.split(" ")[1];
    await deleteToken(accessToken, tokenTypes.ACCESS);
    logger.info("deleted  access token");

    const refreshToken = req.headers.refreshtoken.split(" ")[1];
    await deleteToken(refreshToken, tokenTypes.REFRESH);
    logger.info("deleted refresh token");

    console.log("removed refresh token");
    return res.status(200).send({ message: "logged out" });
  } catch (error) {
    return res.status(unauthorized).send({ message: "unthorization", error });
  }
};

const refreshAuth = async (req, res) => {
  const refreshToken = req.headers.refreshtoken.split(" ")[1];
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
    console.log(refreshTokenDoc);
    const user = refreshTokenDoc.user;

    const accessTokenExp = moment().add(
      process.env.JWT_REFRESH_TOKEN_EXP,
      "days"
    );
    const accessToken = generateToken(
      user._id,
      accessTokenExp,
      tokenTypes.ACCESS
    );

    saveToken(accessToken, user._id, accessTokenExp, tokenTypes.ACCESS);

    return res
      .status(201)
      .send({ message: "refreshed access token.", accessToken });
  } catch (error) {
    return res
      .status(unauthorized)
      .send({ message: "Please authenticate", error: error });
  }
};

const changePassword = async (req, res) => {
  try {
    console.log(req.body, req.headers);
    const { user_id, name, email, password } = req.body;
    const accessToken = req.headers.authorization.split(" ")[1];
    const tokenDoc = await verifyToken(accessToken, tokenTypes.ACCESS);
    const user = await User.findById(user_id).catch((error) => {
      console.log("invalid user_id", error);
      res.status(404).send({ message: "invalid user_id" });
    });
    console.log("user found :", user);
    console.log("tokenDoc.user", tokenDoc.user);
    console.log("user._id", user._id);
    console.log(tokenDoc.user.equals(user._id));
    const hashedPassword = await bcrypt.hash(password, 10);
    if (tokenDoc.user.equals(user._id)) {
      console.log("true");
      const newUserData = {
        name,
        email,
        password: hashedPassword,
      };
      const newUserDoc = await User.findByIdAndUpdate(user_id, newUserData)
        .then((doc) => {
          console.log(doc);
          logger.info("change new info to user " + user_id);
          res.status(201).send({ user: doc });
        })
        .catch((error) => {
          console.error(error);
          log.error("error while change new info to user " + user_id);
          res.status(queryError).send(error);
        });

      res.status(201).send(newUserDoc);
    }
  } catch (error) {
    return res.status(unauthorized).send({ message: "unthorization", error });
  }
};

module.exports = { register, login, logout, refreshAuth, changePassword };
