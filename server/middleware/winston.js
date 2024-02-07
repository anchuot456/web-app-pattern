const appRoot = require("app-root-path");
const winston = require("winston");

const option = {
  file: {
    level: "info",
    filename: `${appRoot}/log/app.log`,
    handleException: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    handleException: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(option.file),
    new winston.transports.Console(option.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
