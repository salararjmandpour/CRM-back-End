const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");

//>---------- import controllers

const xlsxController = require("app/http/controllers/toolsControllers/xlsxController");

//>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

router.post("/import", verifyJWT, xlsxController.importFile);

router.get("/download", xlsxController.downloadFile);

router.get("/export",  xlsxController.exportFile);

module.exports = router;
