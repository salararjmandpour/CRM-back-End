const Sale = require("app/models/Sale");
const Invoice = require("app/models/Invoice");
const User = require("app/models/User");
const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

const generateNumberInvoice = require("app/helpers/generatorNumber");

//*>---------- generate number
const generatePassword = () => {
  var length = 5,
    charset = "1234567890",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

//*>---------- convert english numbers to persian

String.prototype.toPersianDigits = function () {
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return this.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

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

  console.log(dataDecrypt);

  console.log("userId:", userId);
  console.log("saleId:", saleId);

  if (!dataDecrypt) return res.sendStatus(404);

  let oldNumberOfInvoice = await Invoice.find({})
    .sort({ createdAt: -1 })
    .limit(1).toArray;

  if (!oldNumberOfInvoice || oldNumberOfInvoice.length == 0) {
    oldNumberOfInvoiceNew = 0;
  } else {
    oldNumberOfInvoice = oldNumberOfInvoice[0].numberOfInvoice.slice(-4);
    oldNumberOfInvoice = conv2EnNum(oldNumberOfInvoice);
    const oldNumberOfInvoiceNew = parseInt(oldNumberOfInvoice);
    console.log(typeof oldNumberOfInvoice);
  }
  let userName = await User.findOne({ _id: userId });
  userName = userName.fullName.slice(0, 2);

  // let time = new Date();
  // time = Intl.DateTimeFormat("fa-IR").format(time);


  // console.log(numberOfInvoice);

  const invoice = await Invoice.findOne({
    email: dataDecrypt.email,
    mobile: dataDecrypt.mobile,
  });

  if (invoice) return res.status(409);

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

//*>------------ export method

module.exports = {
  createHandlerNew,
  getBySaleIdHandler,
};
