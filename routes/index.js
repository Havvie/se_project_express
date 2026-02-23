const router = require("express").Router();

const usersRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const signupRouter = require("./signup");

router.use("/signup", signupRouter);
router.use("/users", usersRouter);
router.use("/items", clothingItemRouter);

module.exports = router;
