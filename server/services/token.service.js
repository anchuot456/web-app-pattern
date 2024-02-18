const express = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Token = require("../models/token.model");
const { tokenTypes } = require("../config/tokens");
const { unauthorized, queryError } = require("../constants/statusCodes");
require("dotenv");

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userID,
  expire,
  type,
  secret = process.env.JWT_SECRET_KEY
) => {
  const payload = {
    sub: userID,
    iat: moment().unix(),
    exp: expire.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {moment} expires
 * @param {string} type
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userID, expire, type) => {
  const newToken = new Token({
    token,
    user: userID,
    expire: expire.toDate(),
    type,
  });
  const createdToken = await newToken.save();
  console.log("token created: ", createdToken);
  return createdToken;
};

const verifyToken = async (token, type) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub });
    if (!tokenDoc) {
      throw new Error("Token not found");
    }
    return tokenDoc;
  } catch (error) {
    console.log("invalid token");
    throw error;
  }
};

const deleteToken = async (token, type) => {
  const tokenDoc = await Token.deleteOne({
    token,
    type,
  });
};

module.exports = { generateToken, saveToken, verifyToken, deleteToken };
