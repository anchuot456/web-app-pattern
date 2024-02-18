const express = require("express");
const jwt = require("jsonwebtoken");
const { unauthorized } = require("../constants/statusCodes");
const logger = require("./winston");
const { verifyToken, deleteToken } = require("../services/token.service");
const { tokenTypes } = require("../config/tokens");
const { error } = require("winston");
const { refreshAuth } = require("../services/auth.service");

const verifyTokenMiddleware = async (req, res, next) => {
  const authorization = req.headers["authorization"]; // format: 'Bearer <token>'
  if (!authorization) {
    return res.status(unauthorized).send("Access denied. No provided token");
  }
  const accessToken = authorization.split(" ")[1];

  try {
    const tokenDoc = await verifyToken(accessToken, tokenTypes.ACCESS);
    if (!tokenDoc) {
      return res.status(unauthorized).send({ message: "Invalid Token" });
    }
    req.user = tokenDoc.user;
    next();
  } catch (error) {
    logger.error(error);

    //Refresh new access token
    if (error.name === "TokenExpiredError") {
      await deleteToken(accessToken, tokenTypes.ACCESS)
        .then(() => {
          logger.info("deleted old access token");
        })
        .catch((err) => {
          console.error("query error", err);
          logger.error(err);
        });
      await refreshAuth(req, res)
        .then(() => {
          logger.info("refreshed new access token");
        })
        .catch((err) => {
          logger.error(err);
        });
    }
    //return res.status(unauthorized).send({ message: "Invalid Token", error });
  }
};

module.exports = verifyTokenMiddleware;
