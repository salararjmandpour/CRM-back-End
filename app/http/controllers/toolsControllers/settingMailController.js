const express = require("express");
const router = express.Router();
const SettingMail = require("app/models/SettingMail");
const nodeMailer = require("nodemailer");

//*>---------- encrypt data sending

const cerateCipher = require("app/http/middleware/cerateCipher");
const Key = config.encryptionKey;

//*>------------ method set setting mail

const settingMail = async (req, res, next) => {
  const mailDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  const { pass, port, host, user } = mailDecrypt;

  if (!pass || !port || !host || !user) {
    return res.status(400);
  }

  const oldSettingMail = await SettingMail.findOne({
    host: mailDecrypt.host,
  }).exec();

  if (oldSettingMail) {
    try {
      //*>----------- update model for data setting mail

      await SettingMail.findOneAndUpdate(
        { host: mailDecrypt.host },
        {
          host: host,
          port: port,
          user: user,
          pass: pass,
        }
      );

      return res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  try {
    //*>----------- create model for data setting mail
    await SettingMail.find({}).remove().exec();
    await SettingMail.create({
      host: host,
      port: port,
      user: user,
      pass: pass,
    });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ method get setting mail

const getSettingMail = async (req, res) => {
  try {
    const getDataMail = await SettingMail.find({}).exec();

    if (!getDataMail)
      return res.status(404).json({
        status:404,
        message:"تنظیماتی برای ارسل ایمیل شما ثبت نشده است"
      });

    const encryptData = await cerateCipher.encrypt(
      JSON.stringify(getDataMail),
      Key
    );

    return res.status(200).json({ encryptData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>---------------------- module export

module.exports = { settingMail, getSettingMail };
