const express = require("express");
const router = express.Router();


//*>---------- import controllers 

const settingSmsController = require("app/http/controllers/toolsControllers/settingSmsController");
const sendSmsController = require("app/http/controllers/modulesControllers/sendSmsController");


//*>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

//*>---------- create routers

router.post("/set", verifyJWT,settingSmsController.setSettingSms);

router.post("/send",verifyJWT, sendSmsController.sendSms);

router.get("/",verifyJWT, settingSmsController.getSettingSms);


module.exports = router;
