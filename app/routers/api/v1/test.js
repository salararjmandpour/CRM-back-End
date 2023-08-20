
const express = require("express");
const router = express.Router();

//*>---------- middleware

const cerateCipher = require("app/http/middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- create route for test

// const generatePassword = require("app/helpers/generatorNumber");

// router.get("/", generatePassword.generate);


module.exports = router;