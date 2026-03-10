const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const mainRouter = require('./routes/index');
const { HTTP_STATUS_CODES } = require('./utils/errors');

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use('/', mainRouter);

app.use((req, res) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Requested resource not found" });
});

app.use((err, req, res, _next) => {
  const { statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR ? 'An error occurred on the server.' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
