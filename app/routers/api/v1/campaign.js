const express = require("express");
const router = express.Router();

//>---------- controller

const campaignController = require("app/http/controllers/modulesControllers/campaignController");

//>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

//>----------- create route for campaign

router.get("/", verifyJWT, campaignController.getSingleAndAllHandler);

router.post("/", verifyJWT, campaignController.createHandler);

//>----------- exports routers

module.exports = router;
