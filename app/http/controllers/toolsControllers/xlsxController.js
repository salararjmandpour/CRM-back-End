const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");
const xlsx = require("xlsx");

let fullName = "";

const uploadFile = async (req, res, next) => {
  const strId = req.query.userid.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  console.log(strIdNew);
  const expertDecrypt = await cerateCipher.decrypt(strIdNew, Key);
  let expertFullName = await User.findOne({ _id: expertDecrypt });
  expertFullName = expertFullName.fullName;
  console.log(`id: ${expertDecrypt} userName: ${expertFullName}`);

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      console.log(file);
      callback(null, "./upload");
    },
    filename: (req, file, callback) => {
      console.log(file.originalname);
      const temp_file_arr = file.originalname.split(".");

      const temp_file_name = temp_file_arr[0];

      const temp_file_extension = temp_file_arr[1];

      callback(
        null,
        temp_file_name + "-" + Date.now() + "." + temp_file_extension
      );
    },
  });

  const upload = multer({ storage: storage }).single("file");

  upload(req, res, (error) => {
    if (error) {
      console.log(error);
      return res.end("Error Uploading File");
    } else {
      fullName = req.file.path;
      console.log("success", req.file.filename);

      // response.redirect("/fileupload");
    }
    // const file = `../../../../upload/${fullName}`;

    console.log(fullName);
    const wb = xlsx.readFile(fullName, {
      cellDates: true,
    });
    const ws = wb.Sheets["Sheet1"];

    const data = xlsx.utils.sheet_to_json(ws);

    console.log(data);

    fs.unlinkSync(fullName);

    // res.status(200).end(xlsx.utils.sheet_to_csv(ws));

    return res.end("File is uploaded successfully");
  });
};

const downloadFile = (req, res, next) => {
  res.download("./upload/Example Data.zip");

  next();
};

//>---------- module exports

module.exports = { uploadFile, downloadFile };
