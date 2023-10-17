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
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SalesManager,
    ROLES_LIST.FinanceManager,
    ROLES_LIST.AccountingManager,
    ROLES_LIST.Accountant,
    ROLES_LIST.CRMManager
  ),
  clueToSaleController.createHandlerNew
);

router.delete(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.SeniorManager),
  clueToSaleController.deleteSaleById
);

//*>----------- create route for invoice

router.get("/invoice", verifyJWT, invoiceController.getBySaleIdHandler);

router.post("/invoice", verifyJWT, invoiceController.createHandlerNew);

router.put("/invoice", verifyJWT, invoiceController.putBySaleHandler);

router.delete("/invoice", verifyJWT, invoiceController.deleteOneInvoice);

//*>---------- create route for inquiryOfPrice

router.get("/inquiryOfPrice", verifyJWT, inquiryOfPrice.getBySaleIdHandler);

router.post("/inquiryOfPrice", verifyJWT, inquiryOfPrice.createHandlerNew);

router.delete("/inquiryOfPrice", verifyJWT, inquiryOfPrice.deleteOneById);

router.put("/inquiryOfPrice", verifyJWT, inquiryOfPrice.putBySaleHandler);

module.exports = router;
