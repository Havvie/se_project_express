require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const { errors } = require('celebrate');
const mainRouter = require('./routes/index');
const { HTTP_STATUS_CODES } = require('./utils/errors');

const app = express();
const { PORT = 3001 } = process.env;

// Database connection
mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

// Basic middleware
app.use(express.json());
app.use(cors());

// 1. Request logger BEFORE routes
app.use(requestLogger);

// 2. Routes
app.use('/', mainRouter);

// 3. Error logger AFTER routes, BEFORE error handlers
app.use(errorLogger);

// 4. Error handlers (in this specfic order)
app.use(errors());
app.use((err, req, res, next) => {
  const {
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message,
  } = err;

  res.status(statusCode).send({
    message:
      statusCode === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        ? 'An error occured on the server'
        : message,
  });
});

// 5. 404 handler (last middleware)
app.use((req, res) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
    message: "Requested resource not found"
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
