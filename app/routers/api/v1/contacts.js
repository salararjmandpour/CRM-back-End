const express = require("express");
const router = express.Router();

//>---------- controller

const ContactController = require("app/http/controllers/modulesControllers/contactsControllers");

//>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

//>----------- create route for clue

router.post("/", verifyJWT, ContactController.createHandler);

router.get("/", verifyJWT, ContactController.getAllHandler);

router.put("/", verifyJWT, ContactController.updateOneContact);

router.delete("/", verifyJWT, ContactController.deleteOneContact);

router.patch("/", verifyJWT, ContactController.convertorContact);

module.exports = router;
