const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//>---------- controller

const clueController = require("app/http/controllers/modulesControllers/clueController");

//>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//>----------- create route for clue

router.get("/singleandall", verifyJWT, clueController.getOneAndAllHandler);

router.post(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.CRMManager,
  ),
  clueController.createHandler
);

router.put(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.CRMManager
  ),
  clueController.updateOneClue
);

router.delete(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager, ROLES_LIST.SalesManager),
  clueController.deleteOneClue
);

module.exports = router;
