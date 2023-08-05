const express = require("express");
const router = express.Router();

//*>---------- controller

const createSideController = require("app/http/controllers/modulesControllers/createSideController");

//*>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

//*>----------- create route for create side

router.get("/", verifyJWT, createSideController.getUserRole);




module.exports = router;