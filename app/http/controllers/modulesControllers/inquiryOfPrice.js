const InquiryOfPrice = require("app/models/InquiryOfPrice");
const Invoice = require("app/models/Invoice");
const User = require("app/models/User");

//*>----------- import controllers

const sendSmsForInquiryOfPricesController = require("app/http/controllers/toolsControllers/sendSmsForInquiryOfPricesController");

//*>---------- encrypt data sending
const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- import helpers

const generateNumberInquiryOfPrice = require("app/helpers/generatorNumber");

//*>---------- convert persian numbers to english

const conv2EnNum = (str) => {
  return (
    parseFloat(
      str
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
          return d.charCodeAt(0) - 1632;
        }) // Convert Arabic numbers
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
          return d.charCodeAt(0) - 1776;
        }) // Convert Persian numbers
    ) * 1
  );
};

//*>----------- post route InquiryOfPrice

const createHandlerNew = async (req, res, next) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncInquiryOfPrice, Key)
  );

  const userId = dataDecrypt.userId;
  const saleId = dataDecrypt.saleId;

  let oldNumberOfInquiryOfPriceNew = 0;
  if (!dataDecrypt) return res.sendStatus(404);

  let oldNumberOfInquiryOfPrice = await InquiryOfPrice.find({})
    .sort({ createdAt: -1 })
    .limit(1);

  if (!oldNumberOfInquiryOfPrice || oldNumberOfInquiryOfPrice.length === 0) {
    oldNumberOfInquiryOfPriceNew = 0;
  } else if (
    oldNumberOfInquiryOfPrice ||
    !oldNumberOfInquiryOfPrice.length == 0
  ) {
    oldNumberOfInquiryOfPrice =
      oldNumberOfInquiryOfPrice[0].numberOfInquiryOfPrice.slice(-4);
    oldNumberOfInquiryOfPrice = conv2EnNum(oldNumberOfInquiryOfPrice);
    oldNumberOfInquiryOfPriceNew = parseInt(oldNumberOfInquiryOfPrice);
  }
  let userName = await User.findOne({ _id: userId });
  userName = userName.fullName.slice(0, 2);

  //!>----------- End create number of inquiryOfPrice

  const inquiryOfPrice = await InquiryOfPrice.findOne({
    $and: [
      { questionOfPrice: dataDecrypt.questionOfPrice },
      { customerNumber: dataDecrypt.customerNumber },
    ],
  });

  if (inquiryOfPrice) {
    return res.status(409).json({
      message: "مورد تکراری می باشد لطفا بررسی کنید ):",
    });
  }

  const { date, customerNumber, fullName, questionOfPrice } = dataDecrypt;

  const expert = userId;
  const sale = saleId;

  try {
    const numberOfInquiryOfPrice = `${generateNumberInquiryOfPrice.generateInvoiceNumber(
      userName,
      oldNumberOfInquiryOfPriceNew
    )}`;
    //*>----------- create model for data InquiryOfPrice
    await InquiryOfPrice.create({
      numberOfInquiryOfPrice: numberOfInquiryOfPrice,
      date,
      fullName,
      customerNumber,
      questionOfPrice,
      expert,
      sale,
    });

    const inquiryOfPricesFindOnd = await InquiryOfPrice.findOne({
      numberOfInquiryOfPrice: numberOfInquiryOfPrice,
    });

    await sendSmsForInquiryOfPricesController.sendSms(inquiryOfPricesFindOnd);

    res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ get route InquiryOfPrice

const getBySaleIdHandler = async (req, res) => {
  const strId = req.query.saleId.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptSaleId = cerateCipher.decrypt(strIdNew, Key);
  if (!decryptSaleId) return res.sendStatus(404);

  try {
    const inquiryOfPrice = await InquiryOfPrice.find({ sale: decryptSaleId });
    if (!inquiryOfPrice || inquiryOfPrice.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "استعلام بهاء ثبت نشده است",
      });
    }
    const encryptData = cerateCipher.encrypt(
      JSON.stringify(inquiryOfPrice),
      Key
    );
    return res.status(202).json({ encryptData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

//*>----------- put route InquiryOfPrice

const putBySaleHandler = async (req, res) => {
  const strId = req.query.inquiryOfPriceId.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptInquiryOfPriceId = cerateCipher.decrypt(strIdNew, Key);

  if (!decryptInquiryOfPriceId) return res.sendStatus(404);

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncInquiryOfPrice, Key)
  );

  const { date, questionOfPrice } = dataDecrypt;

  try {
    //*>----------- update model for data InquiryOfPrice
    const updateInquiryOfPrice = await InquiryOfPrice.findOneAndUpdate(
      { _id: decryptInquiryOfPriceId },
      {
        date,
        questionOfPrice,
      }
    );
    await updateInquiryOfPrice.save();

    res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>----------- delete route one InquiryOfPrice

const deleteOneById = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");
  const decryptId = cerateCipher.decrypt(strNew, Key);

  try {
    //*>----------- delete model for data invoice
    await InquiryOfPrice.findOneAndDelete({ _id: decryptId });

    return res.status(200).json({ message: "فاکتور مورد نظر شما پاک شود" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};
//*>------------ export method

module.exports = {
  createHandlerNew,
  getBySaleIdHandler,
  putBySaleHandler,
  deleteOneById,
};
