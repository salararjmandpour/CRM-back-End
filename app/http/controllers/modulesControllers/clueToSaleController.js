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
         expertFullName: clue.expertFullName 
        },
      qualityCustomer,
      dateForSale:dataDecrypt.dateForSale,
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

//*>------------ export method

module.exports = {
  createHandlerNew,
};
