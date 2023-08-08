const express = require("express");
const router = express.Router();

//*>----------- import controllers

const settingMail = require("app/http/controllers/toolsControllers/settingMailController");
const sendMail = require("app/http/controllers/modulesControllers/sendMailControllers");

//*>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");


//*>---------- create route

router.post("/set", verifyJWT, settingMail.settingMail);

router.post("/send", verifyJWT, sendMail.sendMail);

router.get("/", verifyJWT, settingMail.getSettingMail);

module.exports = router;
