const express = require("express");
const router = express.Router();

//>------------ import controllers

const authController = require("app/http/controllers/authControllers/authController");


router.post("/", authController.handleLogin);

module.exports = router;
