const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const medicalStorageController = require("app/http/controllers/modulesControllers/medicalStorageController");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for clue

router.get("/teb", verifyJWT, medicalStorageController.searchMedicalStorage);


module.exports = router;
