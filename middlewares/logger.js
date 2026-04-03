const winston = require('winston');
const expressWinston = require('express-winston');

// Create custom formatter
const messageFormat = winston.format.comebine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

// Create request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: 'request.log',
      format: winston.format.json(),
    }),
  ],
  format: winston.format.json(),
});

// Create error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: 'error.log',
      format: winston.format.json(),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};