const Clues = require("app/models/Clue");
const Sale = require("app/models/Sale");
const Invoice = require("app/models/Invoice");
const InquiryOfPrice = require("app/models/InquiryOfPrice");
const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- post route Contact

const createHandlerNew = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncSale, Key)
  );
  const userId = cerateCipher.decrypt(dataDecrypt.userId, Key);

  if (!dataDecrypt) return res.sendStatus(404);

  const clue = await Clues.findOne({ _id: dataDecrypt.id });

  const {
    subject,
    fullName,
    role,
    mobile,
    industry,
    company,
    phonNumber,
    qualityCustomer,
    campaign,
  } = clue;

  try {
    //*>----------- create model for data sale
    await Sale.create({
      subject,
      fullName,
      role,
      mobile,
      expert: {
        expertId: userId,
        expertFullName: clue.expertFullName,
      },
      qualityCustomer,
      dateForSale: dataDecrypt.dateForSale,
      industry,
      company,
      campaign,
      phoneNumber: phonNumber,
      address: {
        address: clue.address,
        state: clue.state,
        cities: clue.cities,
      },
    });

    res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>---------- get method all sale by user

const getByUserHandler = async (req, res) => {
  if (req.query.role && req.query.id) {
    const strId = req.query.id.toString();
    const strIdNew = strId.replaceAll(" ", "+");
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");

    if (!strIdNew && !strRoleNew) return res.sensStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    //!>----------- get all  model for data  by role seniorManager

    if (ROLES_LIST.SeniorManager == decryptUserRole) {
      try {
        const saleAll = await Sale.find({});
        if (saleAll.length == 0)
          return res.status(404).json({
            status: 404,
            message: "فروشی ثبت نشده است",
          });
        const encryptData = cerateCipher.encrypt(JSON.stringify(saleAll), Key);
        return res.status(202).json({ encryptData });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      }
    } else {
      try {
        //!>----------- get all  model for data user
        const saleAll = await Sale.find({ "expert.expertId": decryptUserId });

        if (!saleAll || saleAll.length == 0) {
          return res.status(404).json({
            status: 404,
            message: "فروشی ثبت نشده است",
          });
        }
        const encryptData = cerateCipher.encrypt(JSON.stringify(saleAll), Key);
        return res.status(202).json({ encryptData });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      }
    }
  }

  //*>---------- get method  single sale by id sale

  if (req.query.saleId) {
    const strId = req.query.saleId.toString();
    const strIdNew = strId.replaceAll(" ", "+");
    const decryptSaleId = cerateCipher.decrypt(strIdNew, Key);

    try {
      const sale = await Sale.findOne({ _id: decryptSaleId });
      if (!sale || sale.length == 0) {
        return res.status(404).json({
          status: 404,
          message: "فروشی ثبت نشده است",
        });
      }
      const encryptData = cerateCipher.encrypt(JSON.stringify(sale), Key);
      return res.status(202).json({ encryptData });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
};

//*>---------- delete method all sale by id

const deleteSaleById = async (req, res) => {
  const strId = req.query.id.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptSaleId = cerateCipher.decrypt(strIdNew, Key);

  try {
    await Sale.findOneAndDelete({ _id: decryptSaleId });
    await Invoice.findOneAndDelete({ sale: decryptSaleId });
    await InquiryOfPrice.findOneAndDelete({ sale: decryptSaleId });
    return res
      .status(200)
      .json({ status: 200, message: "فروش با موفقعیت پاک شد" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

//*>------------ export method

module.exports = {
  createHandlerNew,
  getByUserHandler,
  deleteSaleById,
};
