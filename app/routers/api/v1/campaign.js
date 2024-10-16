const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../../config/roles_list");

//*>---------- controller

const campaignController = require("app/http/controllers/modulesControllers/campaignController");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>----------- create route for campaign

router.get(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist,
    ROLES_LIST.SeniorManager
  ),
  campaignController.getSingleAndAllHandler
);

router.post(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesManager
  ),
  campaignController.createHandler
);

router.delete(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesManager
  ),
  campaignController.deleteOneCampaign
);

router.delete(
  "/ClueOfCampaign",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist
  ),
  campaignController.deleteClueOfCampaign
);

router.put(
  "/",
  verifyJWT,
  verifyRoles(
    ROLES_LIST.SeniorManager,
    ROLES_LIST.CRMManager,
    ROLES_LIST.SalesManager,
    ROLES_LIST.SalesSpecialist
  ),
  campaignController.updateOneCampaign
);

//*>----------- exports routers

module.exports = router;
