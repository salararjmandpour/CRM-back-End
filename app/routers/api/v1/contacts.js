const express = require("express");
const router = express.Router();

//*>---------- controller

const ContactController = require("app/http/controllers/modulesControllers/contactsControllers");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");
const ROLES_LIST = require("../../../config/roles_list");

//*>----------- create route for clue

router.post(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.AccountingAssistant,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist
  ),
  ContactController.createHandler
);

router.get("/", verifyJWT, ContactController.getAllHandler);

router.put("/", verifyJWT, ContactController.updateOneContact);

router.delete("/", verifyJWT, ContactController.deleteOneContact);

router.patch("/", verifyJWT, ContactController.convertorContact);

module.exports = router;
