const HTTP_STATUS_CODES = require('./constants');

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.CONFLICT;
  }
}

module.exports = ConflictError;