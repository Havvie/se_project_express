const HTTP_STATUS_CODES = require('./constants');

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;