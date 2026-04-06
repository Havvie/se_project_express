const HTTP_STATUS_CODES = require('./constants');

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;