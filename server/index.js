const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//custom middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./middleware/winston");
const session = require("express-session");
const verifyTokenMiddleware = require("./middleware/authentication");

//Routes
const authRoute = require("./routes/auth.route");
const eventRoute = require("./routes/event.route");
const userRoute = require("./routes/user.route");

try {
  mongoose.connect("mongodb://0.0.0.0:27017").then(() => {
    logger.info("Connected to MongoDB");
  });
} catch (error) {
  logger.error("Error connecting to MongoDB" + error);
}
//Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(
  session({
    secret: "1234",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use("/auth", authRoute);
app.use(verifyTokenMiddleware);

//Routes registration
app.use("/event", eventRoute);
app.use("/user", userRoute);
//Error handler function

app.use((err, req, res, next) => {
  //console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//Start server

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
