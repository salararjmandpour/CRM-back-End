const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const createSideController = require("app/http/controllers/modulesControllers/createSideController");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for create side

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.HrManager,ROLES_LIST.SeniorManager),
  createSideController.getUserRole
);

router.put(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.HrManager,ROLES_LIST.SeniorManager),
  createSideController.createSide
);

module.exports = router;
