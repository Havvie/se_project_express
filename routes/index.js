const router = require("express").Router();

const usersRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", usersRouter);
router.use("/items", clothingItemRouter);

module.exports = router;
