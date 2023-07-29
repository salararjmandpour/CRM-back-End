const express = require("express");
const router = express.Router();
const request = require("request");
const PanelSms = require("app/models/PanelSms");
const moment = require("moment-timezone");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>---------- method send sms

const sendSms = async (req, res) => {
  const messageDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  let utcTime = "";

  if (messageDecrypt.date && messageDecrypt.time) {
    const time = `${messageDecrypt.date} ${messageDecrypt.time}:00`;

    //>---------- Example function to convert client's time to UTC

    const convertToUTC = (clientTimeString, clientTimezone) => {
      // const format = "YYYY-MM-DD HH:mm:ss";

      //>--------- Parse the client time string with the client timezone

      const clientDateTime = moment.tz(clientTimeString, clientTimezone);

      //>--------- Convert to UTC

      const utcDateTime = clientDateTime.clone().utc();

      //>--------- Return the UTC time in the desired format

      return utcDateTime.format();
    };
    const clientTimezone = "Asia/Tehran";
    utcTime = convertToUTC(time, clientTimezone);
  }

  if (!messageDecrypt.date && !messageDecrypt.time) {
    utcTime = new Date().toLocaleString("fa-IR", {
      timeZone: "Asia/Tehran",
    });
  }

  console.log(utcTime);

  const panelSms = await PanelSms.find({}).exec();

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
        time: utcTime,
      },
      json: true,
    },
    function (error, request, body) {
      if (!error && request.statusCode === 200) {
        console.log(request.body);
        return res.sendStatus(200);
      } else {
        console.log("whatever you want");
      }
    }
  );
};

module.exports = { sendSms };
