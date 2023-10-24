const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const generalUserReport = require("app/http/controllers/usersControllers/generalUserReport");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for create side

router.get("/", verifyJWT, generalUserReport.getFindAllClue);

module.exports = router;
