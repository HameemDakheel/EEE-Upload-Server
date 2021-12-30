const { createLogger, format, transports,  } = require("winston");
const { colorize, timestamp, json, combine, errors,printf } = format;
const appRoot = require("app-root-path");

const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        consoleFormat
      ),
      handleExceptions: true,
      level:"silly",
    }),
    new transports.File({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        json()
      ),
      level: "info",
      filename: `${appRoot}/logs/app.log`,
      maxsize: "52428800", //50 MB,
      
    }),
  ],
});

module.exports = logger;
