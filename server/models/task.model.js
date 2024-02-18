const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    dateline: {
      type: Date,
    },
    event: {
      type: Object,
      require: true,
    },
    assignee: {
      type: Object,
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

module.exports = mongoose.model("Task", taskSchema);
