const router = require('express').Router();
const {
  validateSignup,
  validateAuthentication,
} = require('../middlewares/validation');
const usersRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

// Public routes
router.post('/signup', validateSignup, createUser);
router.post('/signin', validateAuthentication, login);

// Routes for authenticated users
router.use('/items', clothingItemRouter);

// Protected routes
router.use(auth);
router.use('/users', usersRouter);

module.exports = router;
