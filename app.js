const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const { NotFoundError } = require('./utils/errors');

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "699a6cafb24635b038496dfc",
  };
  next();
});

app.use('/', mainRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use((err, req, res, _next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server.' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
