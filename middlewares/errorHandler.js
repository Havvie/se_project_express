const { HTTP_STATUS_CODES } = require('../utils/errors/constants');

const errorHandler = (err, req, res, _next) => {
  const {
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message,
  } = err;

  res.status(statusCode).send({
    message:
      statusCode === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        ? 'An error occurred on the server'
        : message,
  });
};

module.exports = errorHandler;