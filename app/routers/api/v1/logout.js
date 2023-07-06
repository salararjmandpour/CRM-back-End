const express = require("express");
const router = express.Router();

const logoutController = require("app/http/controllers/authControllers/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
