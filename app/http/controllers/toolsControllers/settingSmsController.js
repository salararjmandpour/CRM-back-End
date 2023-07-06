const express = require("express");
const router = express.Router();
const request = require("request");
const PanelSms = require("app/models/PanelSms");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>------------ method set setting sms 

const setSettingSms = async (req, res, next) => {
  const panelSms = req.query.name.toString();

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  //>------------ check panel sms is ippanel

  if (
    panelSms === "max-sms.ir" ||
    panelSms === "farazsms.com" ||
    panelSms === "mediana.ir"
  ) {
    const oldPanelSms = await PanelSms.findOne({
      uname: dataDecrypt.uname,
    }).exec();

    if (oldPanelSms) {
      try {
        //>----------- update model for data panel sms

        await PanelSms.findOneAndUpdate(
          { uname: dataDecrypt.uname },
          {
            url: "http://ippanel.com/api/select",
            uname: dataDecrypt.uname,
            pass: dataDecrypt.pass,
            from: dataDecrypt.from,
          }
        );

        return res.sendStatus(202);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
    }

    try {
      //>----------- create model for data panel sms

      await PanelSms.find({}).remove().exec();
      const dataSms = await PanelSms.create({
        url: "http://ippanel.com/api/select",
        uname: dataDecrypt.uname,
        pass: dataDecrypt.pass,
        from: dataDecrypt.from,
      });
      return res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//>------------ method get setting sms 

const getSettingSms = async (req, res) => {

  try {

    const getDataSms = await PanelSms.find({}).exec();


    if (!getDataSms) return res.status(304).send("پنل پیامکی ثبت نشده است");

    const encryptData = await cerateCipher.encrypt(
      JSON.stringify(getDataSms),
      Key
    );


    return res.status(200).json({ encryptData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};


//>---------- module exports

module.exports = { setSettingSms , getSettingSms};
