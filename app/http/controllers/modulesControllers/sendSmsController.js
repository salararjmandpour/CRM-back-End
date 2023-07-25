const express = require("express");
const router = express.Router();
const request = require("request");
const PanelSms = require("app/models/PanelSms");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>---------- method send sms

const sendSms = async (req, res) => {
  const panelSms = await PanelSms.find({}).exec();

  const messageDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  console.log(`${messageDecrypt.date} ${messageDecrypt.time}`);
  request.post(
    {
      url: panelSms[0].url,
      body: {
        op: "send",
        uname: panelSms[0].uname,
        pass: panelSms[0].pass,
        message: messageDecrypt.message,
        from: panelSms[0].from,
        to: messageDecrypt.mobile,
        // time: `${messageDecrypt.date} ${messageDecrypt.time}`,
      },
      json: true,
    },
    function (error, request, body) {
      if (!error && request.statusCode === 200) {
        //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ message
        console.log(request.body);
        return res.sendStatus(200);
      } else {
        console.log("whatever you want");
      }
    }
  );
};

module.exports = { sendSms };

// const d = new Date(getDates);
// return Intl.DateTimeFormat("fa-IR").format(d);
