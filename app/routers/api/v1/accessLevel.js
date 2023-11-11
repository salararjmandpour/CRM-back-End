const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const accessLevelController = require("app/http/controllers/modulesControllers/accessLevelController");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for create side

router.get(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.HrManager,
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,

  ),
  accessLevelController.getUserRole
);

router.put(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.HrManager,
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,

  ),
  accessLevelController.putAccessLevelForUser
);
module.exports = router;
