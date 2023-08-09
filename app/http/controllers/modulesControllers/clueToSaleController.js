const User = require("app/models/User");
const Clues = require("app/models/Clue");
const Contact = require("app/models/Contact");
const Sale = require("app/models/Sale");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- post route Contact

const createHandlerNew = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncSale, Key)
  );
  console.log(dataDecrypt);
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

//*>---------- get method all sale

const getByUserHandler = async (req, res) => {
  const strId = req.query.id.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptUserId = cerateCipher.decrypt(strIdNew, Key);
  console.log(decryptUserId);

  try {
    //!>----------- get all  model for data user
    const saleAll = await Sale.find({ "expert.expertId": decryptUserId });
    console.log(saleAll);

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
};

//*>------------ export method

module.exports = {
  createHandlerNew,
  getByUserHandler,
};
