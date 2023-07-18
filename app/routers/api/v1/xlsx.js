const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");

//>---------- import controllers

const xlsxController = require("app/http/controllers/toolsControllers/xlsxController");

//>---------- import middleware

const verifyJWT = require("app/http/middleware/authMiddleware/verifyJWT");

router.post("/upload", xlsxController.uploadFile);

router.get("/download", xlsxController.downloadFile);

module.exports = router;
