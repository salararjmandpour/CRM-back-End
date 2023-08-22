const Sale = require("app/models/Sale");
const Invoice = require("app/models/Invoice");
const User = require("app/models/User");
const ROLES_LIST = require("app/config/roles_list");

//*>----------- import middleware

//*>---------- encrypt data sending
const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- import helpers

const generateNumberInvoice = require("app/helpers/generatorNumber");

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

//*>----------- post route Invoice

const createHandlerNew = async (req, res, next) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncInvoice, Key)
  );
  const userId = cerateCipher.decrypt(dataDecrypt.userId, Key);
  const saleId = cerateCipher.decrypt(dataDecrypt.saleId, Key);

  //!>----------- Start create number of invoice

  let oldNumberOfInvoiceNew = 0;
  if (!dataDecrypt) return res.sendStatus(404);

  let oldNumberOfInvoice = await Invoice.find({})
    .sort({ createdAt: -1 })
    .limit(1);
  console.log(oldNumberOfInvoice);

  if (!oldNumberOfInvoice || oldNumberOfInvoice.length === 0) {
    oldNumberOfInvoiceNew = 0;
    console.log("null", oldNumberOfInvoiceNew);
  } else if (oldNumberOfInvoice || !oldNumberOfInvoice.length == 0) {
    oldNumberOfInvoice = oldNumberOfInvoice[0].numberOfInvoice.slice(-4);
    oldNumberOfInvoice = conv2EnNum(oldNumberOfInvoice);
    oldNumberOfInvoiceNew = parseInt(oldNumberOfInvoice);
    console.log(typeof oldNumberOfInvoice);
  }
  let userName = await User.findOne({ _id: userId });
  userName = userName.fullName.slice(0, 2);

  //!>----------- End create number of invoice

  const invoice = await Invoice.findOne({
    email: dataDecrypt.email,
    mobile: dataDecrypt.mobile,
  });

  if (invoice) {
    return res.status(409).json({
      message: "شماره موبایل یا ایمیل تکراری می باشد لطفا بررسی کنید ):",
    });
  }

  const {
    nameOfInvoice,
    statusInvoice,
    nameOfAgent,
    economicCode,
    mobile,
    email,
    wayOfPost,
    description,
    wayOfPay,
    addressOfProduct,
    addressOfInvoice,
    sumTax,
    finalPrice,
  } = dataDecrypt;

  const expert = userId;
  const sale = saleId;

  try {
    const numberOfInvoice = `${generateNumberInvoice.generateInvoiceNumber(
      userName,
      oldNumberOfInvoiceNew
    )}`;
    //*>----------- create model for data invoice
    await Invoice.create({
      numberOfInvoice: numberOfInvoice,
      nameOfInvoice,
      statusInvoice,
      nameOfAgent,
      economicCode,
      mobile,
      email,
      wayOfPost,
      description,
      wayOfPay,
      addressOfProduct,
      addressOfInvoice,
      sumTax,
      finalPrice,
      expert,
      sale,
    });

    res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ get route Invoice

const getBySaleIdHandler = async (req, res) => {
  const strId = req.query.saleId.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptSaleId = cerateCipher.decrypt(strIdNew, Key);
  if (!decryptSaleId) return res.sensStatus(404);

  try {
    const invoice = await Invoice.find({ sale: decryptSaleId });
    if (!invoice || invoice.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "سرنخی ثبت نشده است",
      });
    }
    const encryptData = cerateCipher.encrypt(JSON.stringify(invoice), Key);
    return res.status(202).json({ encryptData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

//*>----------- put route invoice

const putBySaleHandler = async (req, res) => {
  const strId = req.query.invoiceId.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptInvoiceId = cerateCipher.decrypt(strIdNew, Key);
  if (!decryptInvoiceId) return res.sensStatus(404);

  console.log(decryptInvoiceId);

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncInvoice, Key)
  );

  console.log(dataDecrypt);

  const invoice = await Invoice.find({
    email: dataDecrypt.email,
    mobile: dataDecrypt.mobile,
  }).exec();

  console.log(invoice);

  if (invoice) {
    return res
      .status(409)
      .json({
        message: "شماره موبایل یا ایمیل تکراری می باشد لطفا بررسی کنید ):",
      });
  }

  const {
    nameOfInvoice,
    statusInvoice,
    nameOfAgent,
    economicCode,
    mobile,
    email,
    wayOfPost,
    description,
    wayOfPay,
    addressOfProduct,
    addressOfInvoice,
    sumTax,
    finalPrice,
  } = dataDecrypt;

  try {
    //*>----------- update model for data invoice
    const updateInvoice = await Invoice.findOneAndUpdate(
      { _id: decryptInvoiceId },
      {
        nameOfInvoice: nameOfInvoice,
        statusInvoice: statusInvoice,
        nameOfAgent: nameOfAgent,
        economicCode: economicCode,
        mobile: mobile,
        email: email,
        wayOfPost: wayOfPost,
        description: description,
        wayOfPay: wayOfPay,
        addressOfProduct: addressOfProduct,
        addressOfInvoice: addressOfInvoice,
        sumTax: sumTax,
        finalPrice: finalPrice,
      }
    );
    console.log("test:", updateInvoice);
    await updateInvoice.save();

    res.sendStatus(202);
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
};
