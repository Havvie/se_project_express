const HTTP_STATUS_CODES = require('./constants');

class InternalServerError extends Error {
  constructor(message = "An error occurred on the server") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;