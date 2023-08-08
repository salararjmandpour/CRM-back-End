
const express = require("express");
const router = express.Router();

//*>---------- middleware

const cerateCipher = require("app/http/middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- create route for test

router.get("/", (req,res)=>{
  const object = { name: "John", age: 30, city: "New York" };
  let output = cerateCipher.encrypt(JSON.stringify(object), Key);

    res.json({
      encrypted: output,
      decode:  JSON.parse(cerateCipher.decrypt(output, Key)),
    });})


module.exports = router;