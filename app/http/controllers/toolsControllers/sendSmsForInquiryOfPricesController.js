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

  const options = {
    method: "POST",
    url: "http://rest.ippanel.com/v1/messages/patterns/send",
    headers: {
      Authorization: "AccessKey 6u30xeWXFpOzM5gU_pK3b_BbotkMUhqQWbwVAlRWO2Y=",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pattern_code: "pnp5kebobifu3f1",
      originator: "+98EVENT",
      recipient: "+989118121784",
      values: {
        "name-customer": "تست",
        "number-of-inquiry-of-price": "test",
        "persian-date": "test",
        "name-expert": "test",
      },
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

  // request.post(
  //   {
  //     url: "http://rest.ippanel.com/v1/messages/patterns/send",
  //     body: {
  //       op: "pattern",
  //       user: "U9121826300",
  //       pass: "Med0079207510",
  //       fromNum: "+90009735",
  //       toNum: "9118121784",
  //       patternCode: "pnp5kebobifu3f1",
  //       inputData: [
  //         { "name-customer": "تست" },
  //         { "number-of-inquiry-of-price": " test" },
  //         { "persian-date": "test" },
  //         { "name-expert": "test" },
  //       ],
  //     },
  //     json: true,
  //   },
  //   function (error, request, body) {
  //     if (!error && request.statusCode === 200) {
  //       console.log(request.body);
  //     } else {
  //       console.log("whatever you want");
  //     }
  //   }
  // );
};

module.exports = { sendSms };
