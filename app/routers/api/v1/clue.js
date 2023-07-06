const express = require("express");
const router = express.Router();

//>---------- controller

const clueController = require("app/http/controllers/modulesControllers/clueController");

//>---------- middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");


//>----------- create route for clue

router.get("/singleandall", verifyJWT, clueController.getOneAndAllHandler);

router.post("/", verifyJWT, clueController.createHandler);

router.put("/", verifyJWT, clueController.updateOneClue);

router.delete("/", verifyJWT, clueController.deleteOneClue);

module.exports = router;
