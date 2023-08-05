const express = require("express");
const router = express.Router();

//>---------- import controllers

const userController = require("app/http/controllers/usersControllers/usersController");

//>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");
const ROLES_LIST = require("../../../config/roles_list");

//>--------- routers

router.post(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager),
  userController.getAllUsers
);

module.exports = router;
