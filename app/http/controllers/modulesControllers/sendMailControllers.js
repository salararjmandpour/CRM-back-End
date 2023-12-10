const express = require("express");
const router = express.Router();
const SettingMail = require("app/models/SettingMail");
const nodeMailer = require("nodemailer");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>---------- method send mail

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
    pool: true,
    host: "mail.0xf0.ir",
    port: 456,
    secure: true,
    // secureConnection: true,
    auth: {
      user: "codev@0xf0.ir",
      pass: "3K$p3emA8sAI",
    },
    tls: {
      rejectUnauthorized: false
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
