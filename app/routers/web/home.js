const express = require("express");
const router = express.Router();


//>---------------------- Controller

const homeController = require("app/http/controllers/homeController");

//>---------------------- Home router

router.get('/', homeController.index);


//>---------------------- module export

module.exports = router;