const express = require("express");
const router = express.Router();

//>---------------------- middleware



//>---------------------- Admin route



//>---------------------- Home route

const homeRouter = require("./home");
router.use("/", homeRouter);

//>---------------------- Auth Router



//>---------------------- module export

module.exports = router;