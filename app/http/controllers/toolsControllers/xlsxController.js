const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");
const fs = require("fs");
const xlsx = require("xlsx");
const User = require("app/models/User");
const Clues = require("app/models/Clue");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

let fullNameFile = "";

//>---------- create Date
const createDate = () => {
  const date = new Date();
  const option = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  let totalDate = date.toLocaleDateString("fa-IR", option);
  totalDate = totalDate.replaceAll("/", "-");
  return totalDate;
};

//>---------- create method import xlsx of clues

const importFile = async (req, res, next) => {
  if (req.query.userid) {
    const strId = req.query.userid.toString();
    const strIdNew = strId.replaceAll(" ", "+");
    console.log(strIdNew);
    const expertDecrypt = await cerateCipher.decrypt(strIdNew, Key);
    let expertFullName = await User.findOne({ _id: expertDecrypt });
    expertFullName = expertFullName.fullName;

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

    upload(req, res, async (error) => {
      if (error) {
        console.log(error);
        return res.end("Error Uploading File");
      } else {
        fullNameFile = req.file.path;
        // console.log("success", req.file.filename);
      }

      const wb = xlsx.readFile(fullNameFile, {
        cellDates: true,
      });
      const ws = wb.Sheets["Sheet1"];

      const data = xlsx.utils.sheet_to_json(ws);

      try {
        for (let index = 0; index < data.length; index++) {
          console.log(`index : ${index}`, data[index]);

          const {
            subject,
            fullName,
            role,
            mobile,
            industry,
            company,
            phonNumber,
            state,
            cities,
            address,
            qualityCustomer,
            callTime,
          } = data[index];

          if (
            !subject ||
            !fullName ||
            !role ||
            !mobile ||
            !industry ||
            !expertDecrypt ||
            !expertFullName ||
            !company ||
            !phonNumber ||
            !state ||
            !cities ||
            !address ||
            !callTime ||
            !qualityCustomer
          ) {
            return res
              .status(400)
              .json({ message: "فایل مورد نظر دارای یک فیلد خالی می باشد " });
          }

          const duplicate = await Clues.findOne({ mobile, phonNumber }).exec();

          if (duplicate) return res.status(409);

          console.log("subject :", subject);
          await Clues.create({
            subject: subject,
            fullName: fullName,
            role: role,
            mobile: mobile,
            industry: industry,
            expert: expertDecrypt,
            expertFullName: expertFullName,
            company: company,
            phonNumber: phonNumber,
            state: state,
            cities: cities,
            address: address,
            qualityCustomer: qualityCustomer,
            callTime: callTime,
          });
        }

        fs.unlinkSync(fullNameFile);

        return res.sendStatus(201);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
    });
  } else {
    return res.status(409);
  }
};

//>---------- create method export xlsx of clues

const exportFile = async (req, res, next) => {
  const strId = req.query.userid.toString();
  const strIdNew = strId.replaceAll(" ", "+");

  const expertDecrypt = await cerateCipher.decrypt(strIdNew, Key);

  const exportFile = await Clues.find(
    {
      expert: expertDecrypt,
    },
    {
      _id: 0,
      expert: 0,
      campaign: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  let newData = JSON.parse(JSON.stringify(exportFile));

  newData.map((record) => {
    delete record.id;
    return record;
  });

  const ws = xlsx.utils.json_to_sheet(newData);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  let filename = `./upload/${createDate()} Export Clues.xlsx`;
  xlsx.writeFile(wb, filename);

  res.download(filename);

  setTimeout(() => {
    fs.unlinkSync(filename);
  }, "2000");
};

//>---------- create method example xlsx of clues

const downloadFile = (req, res, next) => {
  res.download("./upload/Example Data.zip");
};

//>---------- module exports

module.exports = { importFile, exportFile, downloadFile };
