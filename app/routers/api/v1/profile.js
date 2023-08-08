const express = require("express");
const router = express.Router();



//*>---------- controller 
const userController = require("app/http/controllers/usersControllers/usersController");

//*>---------- middleware 
const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");
const verifyRoles = require("app/http/middleware/authMiddleware/verifyRoles");

const ROLES_LIST = require("app/config/roles_list");


//*>---------- post route 

router.get("/", verifyJWT, userController.getSingleUser);



//>---------- export module
module.exports = router;
