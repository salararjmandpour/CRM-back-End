const express = require("express");
const router = express.Router();


//*>------------ import middleware


const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

//*>---------- routers

router.post("/", verifyJWT, verifyRoles);


module.exports = router;
