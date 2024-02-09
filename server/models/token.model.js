const mongoose = require("mongoose");
const { tokenTypes } = require("../config/tokens");

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      require: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
      require: true,
    },
    expire: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Token", tokenSchema);
