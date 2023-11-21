const express = require("express");
const router = express.Router();

//*>---------- controller

const ContactController = require("app/http/controllers/modulesControllers/contactsControllers");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");
const ROLES_LIST = require("../../../config/roles_list");

//*>----------- create route for clue

router.get("/", verifyJWT, ContactController.getAllHandler);

router.post(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.AccountingAssistant,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  ContactController.createHandler
);

router.put(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.AccountingAssistant,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  ContactController.updateOneContact
);

router.delete(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager, ROLES_LIST.CRMManager),
  ContactController.deleteOneContact
);

router.patch(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.AccountingAssistant,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  ContactController.convertorContact
);

module.exports = router;
