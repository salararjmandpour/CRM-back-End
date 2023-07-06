const express = require("express");
const router = express.Router();

//>----------- import controllers

const registerController = require("app/http/controllers/authControllers/registerController");

router.post("/", registerController.register);

module.exports = router;
