const HTTP_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.FORBIDDEN;
  }
}

class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
  }
}

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.CONFLICT;
  }
}

class InternalServerError extends Error {
  constructor(message = "An error occurred on the server") {
    super(message);
    this.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  HTTP_STATUS_CODES,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
