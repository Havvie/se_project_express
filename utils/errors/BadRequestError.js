const HTTP_STATUS_CODES = require('./constants');

class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;