const User = require("../models/user");
const { BadRequestError, NotFoundError } = require("../utils/errors");

// GET /users

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, avatar } = req.body || {};

  if (!name || !avatar) {
    return next(new BadRequestError("Name and avatar are required"));
  }

  return User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err.name, err.message);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user id"));
      }
      return next(err);
    });
};

module.exports = { getUsers, createUser, getUser };