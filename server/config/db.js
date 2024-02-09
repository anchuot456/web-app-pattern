const mongoose = require("mongoose");
const logger = require("../middleware/winston");

mongoose
  .connect("mongodb://localhost:27017/webapppattern", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  });
