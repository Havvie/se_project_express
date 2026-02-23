class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictError,
};
