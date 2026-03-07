const router = require("express").Router();

const usersRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require ("../middlewares/auth");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", clothingItemRouter);

router.use(auth);

router.use("/users", usersRouter);

module.exports = router;
