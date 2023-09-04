const express = require("express");
const router = express.Router();



//*>---------------------- Home route

const homeRouter = require("./home");
router.use("/", homeRouter);


//*>---------------------- module export

module.exports = router;