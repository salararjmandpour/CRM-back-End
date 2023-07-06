const express = require("express");
const router = express.Router();

//>---------- import controllers

const userController = require("app/http/controllers/usersControllers/usersController");

//>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//>--------- routers

router.post("/", verifyJWT, verifyRoles, userController.getAllUsers);

module.exports = router;
