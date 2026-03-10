const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");

// POST /signup
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body || {};

  if (password.length < 8) {
    return next(new BadRequestError("Password must be at least 8 characters"));
  }

  if (!name || !avatar || !email || !password) {
    return next(new BadRequestError("Invalid data"));
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      // Do NOT return password hash
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).send(userObject);
    })
    .catch((err) => {
      // Duplicate email
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

// POST /signin
const login = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return next(new BadRequestError("Invalid data"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.send({ token });
    })
    .catch((err) => {
      // findUserByCredentials throws UnauthorizedError
      if (err.name === "UnauthorizedError") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }
      return next(err);
    });
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user id"));
      }
      return next(err);
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body || {};

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user id"));
      }
      return next(err);
    })
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};