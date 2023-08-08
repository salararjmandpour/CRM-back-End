const express = require("express");
const router = express.Router();

//*>----------- import controllers

const refreshTokenController = require("app/http/controllers/authControllers/refreshTokenController");


//*>----------- routers 

router.get("/", refreshTokenController.handleRefreshToken);



module.exports = router;
