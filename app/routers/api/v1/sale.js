const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const clueToSaleController = require("app/http/controllers/modulesControllers/clueToSaleController");
const invoiceController = require("app/http/controllers/modulesControllers/invoiceController");
const inquiryOfPrice = require("app/http/controllers/modulesControllers/inquiryOfPrice");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for sale

router.get("/", verifyJWT, clueToSaleController.getByUserHandler);

router.post(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.Assistant,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager,
  ),
  clueToSaleController.createHandlerNew
);

router.delete(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager, ROLES_LIST.CRMManager),
  clueToSaleController.deleteSaleById
);
//*>----------- create route for activity

router.get(
  "/activity",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.Assistant,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  clueToSaleController.getHandlerActivity
);

router.post(
  "/activity",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.Assistant,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  clueToSaleController.createHandlerActivity
);

router.put(
  "/activity",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.SalesManager,
    ROLES_LIST.ContentManager
  ),
  clueToSaleController.updateSaleById
);

router.delete(
  "/activity",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager, ROLES_LIST.CRMManager),
  clueToSaleController.deleteSaleById
);

//*>----------- create route for invoice

router.get("/invoice", verifyJWT, invoiceController.getBySaleIdHandler);

router.post(
  "/invoice",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.Assistant,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  invoiceController.createHandlerNew
);

router.put(
  "/invoice",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.ContentManager
  ),
  invoiceController.putBySaleHandler
);

router.delete(
  "/invoice",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager, ROLES_LIST.CRMManager),
  invoiceController.deleteOneInvoice
);

//*>---------- create route for inquiryOfPrice

router.get("/inquiryOfPrice", verifyJWT, inquiryOfPrice.getBySaleIdHandler);

router.post(
  "/inquiryOfPrice",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.Assistant,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  inquiryOfPrice.createHandlerNew
);

router.put(
  "/inquiryOfPrice",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.Assistant,
    ROLES_LIST.LogisticsManager,
    ROLES_LIST.ContentManager
  ),
  inquiryOfPrice.putBySaleHandler
);

router.delete(
  "/inquiryOfPrice",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager, ROLES_LIST.CRMManager),
  inquiryOfPrice.deleteOneById
);

module.exports = router;
