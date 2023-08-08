const express = require("express");
const router = express.Router();

//*>----------- import controllers

const notificationsController = require("app/http/controllers/modulesControllers/notificationsControllers");

//*>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

//*>---------- create route

router.get("/get", verifyJWT, notificationsController.getNotifications);

module.exports = router;
