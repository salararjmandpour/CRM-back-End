const express = require("express");
const router = express.Router();
const SettingMail = require("app/models/SettingMail");
const nodeMailer = require("nodemailer");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>---------- method send mail

const sendMail = async (req, res) => {
  const userMail = await SettingMail.find({}).exec();

  const sendMailDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  const { from, to, subject, text } = sendMailDecrypt;

  if (!from || !to || !subject || !text) {
    return res.status(400);
  }

  const transporter = await nodeMailer.createTransport({
    host: userMail[0].host,
    port: userMail[0].port,
    secureConnection: true,
    auth: {
      user: userMail[0].user,
      pass: userMail[0].pass,
    },
  });

  const mailOptions = await {
    from: `${from} < ${from} >`,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error=" + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};

module.exports = { sendMail };
