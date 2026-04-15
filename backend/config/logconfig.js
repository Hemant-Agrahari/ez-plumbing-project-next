let winston = require("winston");
require("winston-daily-rotate-file");

let transport = new winston.transports.DailyRotateFile({
  filename: "log/ezheatandair-%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

global.logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [transport],
});
