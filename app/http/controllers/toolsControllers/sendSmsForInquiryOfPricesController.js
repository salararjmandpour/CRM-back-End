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
  const panelSms = await PanelSms.find({}).exec();

  console.log(body.numberOfInquiryOfPrice);
  const nameExpert = await User.findOne({ _id: body.expert });
  const nameCustomer = await Sale.findOne({ _id: body.sale });

  const message = `مشتری گرامی ${nameCustomer.fullName} در شرکت آرشیدا طب یک استعلام بها به شماره : ${body.numberOfInquiryOfPrice} در تاریخ : ${body.persianDate} توسط کارشناس این مجموعه ${nameExpert.fullName} ثبت شده است .
سایت مجموعه : www.arshidateb.com
`;

  request.post(
    {
      url: panelSms[0].url,
      body: {
        op: "pattern",
        uname: panelSms[0].uname,
        pass: panelSms[0].pass,
        from: panelSms[0].from,
        // message: message,
        toNum: ["9118121784"],
        patternCode: "pnp5kebobifu3f1",
        inputData: [
          { namecustomer: nameCustomer.fullName },
          { numberofinquiryofprice: body.numberOfInquiryOfPrice },
          { persiandate: body.persianDate },
          { nameexpert: nameExpert.fullName },
        ],
      },
      json: true,
    },
    function (error, request, body) {
      if (!error && request.statusCode === 200) {
        return 200;
      } else {
        console.log("whatever you want");
      }
    }
  );
};

module.exports = { sendSms };
