const HTTP_STATUS_CODES = require('./constants');

class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;