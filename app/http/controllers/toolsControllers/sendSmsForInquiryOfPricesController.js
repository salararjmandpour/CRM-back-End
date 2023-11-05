const express = require("express");
const router = express.Router();
const request = require("request");
const User = require("app/models/User");
const PanelSms = require("app/models/PanelSms");
const Sale = require("app/models/Sale");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>---------- method send sms

const sendSms = async (body) => {
  // const panelSms = await PanelSms.find({}).exec();

  // console.log(body.numberOfInquiryOfPrice);
  // const nameExpert = await User.findOne({ _id: body.expert });

  // const options = {
  //   method: "POST",
  //   url: "https://ippanel.com/api/select",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Cookie: "DefaultLang=fa; PHPSESSID=s8hsaftornfmi9jiq7hdr06ec3",
  //   },
  //   body: JSON.stringify({
  //     op: "pattern",
  //     user: panelSms[0].uname,
  //     pass: panelSms[0].pass,
  //     fromNum: panelSms[0].from,
  //     toNum: ["9118121784","9221581237"],
  //     patternCode: "pnp5kebobifu3f1",
  //     inputData: [
  //       {
  //         "name-customer": body.fullName,
  //         "number-of-inquiry-of-price": body.numberOfInquiryOfPrice,
  //         "persian-date": body.date,
  //         "name-expert": nameExpert.fullName,
  //       },
  //     ],
  //   }),
  // };

  // request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);

  // });
};

module.exports = { sendSms };
