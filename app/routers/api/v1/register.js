const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- import controllers

const registerController = require("app/http/controllers/authControllers/registerController");

//*>----------- create route for User

router.post("/", registerController.register);

router.post(
  "/edit",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager),
  registerController.editUserPasswordByAdmin
);


module.exports = router;
