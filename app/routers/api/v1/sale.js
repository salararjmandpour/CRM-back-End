const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const clueToSaleController = require("app/http/controllers/modulesControllers/clueToSaleController");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for clue

router.get("/", verifyJWT, clueToSaleController.getByUserHandler);

router.post(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager
    // ROLES_LIST.SalesSpecialist,
    // ROLES_LIST.SalesManager,
    // ROLES_LIST.FinanceManager,
    // ROLES_LIST.AccountingManager,
    // ROLES_LIST.Accountant,
    // ROLES_LIST.CRMManager
  ),
  clueToSaleController.createHandlerNew
);

module.exports = router;
