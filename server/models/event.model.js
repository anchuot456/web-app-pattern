const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const userModel = require("./user.model");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    responsible: {
      type: ObjectId,
      require: true,
    },
    participant: [
      {
        type: ObjectId,
        ref: userModel,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Event", eventSchema);
