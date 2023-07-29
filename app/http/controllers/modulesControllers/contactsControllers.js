const User = require("app/models/User");
const Clues = require("app/models/Clue");
const Contact = require("app/models/Contact");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>----------- post route Contact

const createHandler = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  if (req.body.getId.userId) {
    const expertDecrypt = await cerateCipher.decrypt(
      req.body.getId.userId,
      Key
    );

    let expertFullName = await User.findOne({ _id: expertDecrypt });
    expertFullName = expertFullName.fullName;

    console.log(dataDecrypt);
    console.log(expertDecrypt);
    console.log(expertFullName);

    const {
      fullName,
      role,
      mobile,
      industry,
      company,
      phonNumber,
      state,
      cities,
      address,
      atmCard,
      fax,
      birthDay,
    } = dataDecrypt;

    if (
      !fullName ||
      !role ||
      !mobile ||
      !industry ||
      !company ||
      !expertFullName ||
      !address
    ) {
      return res.status(400);
    }

    const duplicate = await Contact.findOne({ mobile }).exec();

    if (duplicate) return res.status(409);

    try {
      //>----------- create model for data clue

      await Contact.create({
        fullName: fullName,
        role: role,
        mobile: mobile,
        industry: industry,
        expert: expertDecrypt,
        expertFullName: expertFullName,
        company: company,
        phonNumber: phonNumber,
        state: state,
        cities: cities,
        address: address,
        atmCard: atmCard,
        fax: fax,
        birthDay: birthDay,
      });

      res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//>----------- get route all Contact

const getAllHandler = async (req, res) => {
  const strId = req.query.id.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptUserId = cerateCipher.decrypt(strIdNew, Key);
  console.log(decryptUserId);

  try {
    //>----------- get all  model for data user
    const contact = await Contact.find({ expert: decryptUserId });

    if (!contact || contact.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "کانتکتی ثبت نشده است",
      });
    }
    const encryptData = cerateCipher.encrypt(JSON.stringify(contact), Key);
    return res.status(202).json({ encryptData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//>------------ export method

module.exports = {
  createHandler,
  getAllHandler,
};
