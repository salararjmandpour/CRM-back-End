const express = require("express");
const router = express.Router();

//*>---------- middleware

const cerateCipher = require("app/http/middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- import controller

const createCustomer = require("app/http/controllers/toolsControllers/customerController");

//*>----------- create route for test

router.post("/", createCustomer.createCustomer);

router.get("/", createCustomer.getCustomer);

module.exports = router;
