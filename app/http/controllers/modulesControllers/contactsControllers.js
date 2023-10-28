const User = require("app/models/User");
const Clues = require("app/models/Clue");
const Contact = require("app/models/Contact");
const ROLES_LIST = require("app/config/roles_list");


//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- post route Contact

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
      isContactPrivate,
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
      //*>----------- create model for data clue
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
        isContactPrivate: isContactPrivate,
        birthDay: birthDay,
      });

      res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//*>----------- get route all Contact

const getAllHandler = async (req, res) => {
  if (req.query.role && req.query.id) {
    const strId = req.query.id.toString();
    const strIdNew = strId.replaceAll(" ", "+");
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");

    if (!strIdNew && !strRoleNew) return res.sendStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    if (ROLES_LIST.SeniorManager == decryptUserRole) {
      try {
        //*>----------- get all model data by admin

        const contact = await Contact.find({});

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
    } else {
      try {
        //*>----------- get all model data by user

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
    }
  }
};

//*>----------- put route one Contact

const updateOneContact = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = cerateCipher.decrypt(strNew, Key);
  if (!decryptId) return res.sendStatus(404);

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

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

  if (fullName && mobile) {
    if (!fullName || !role || !mobile || !industry || !company || !address) {
      return res.status(400);
    }
    try {

      //*>----------- create model for data clue

      await Contact.findOneAndUpdate(
        { _id: decryptId },
        {
          fullName: fullName,
          role: role,
          mobile: mobile,
          industry: industry,
          company: company,
          phonNumber: phonNumber,
          state: state,
          cities: cities,
          address: address,
          atmCard: atmCard,
          fax: fax,
          birthDay: birthDay,
        }
      );

      res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//*>----------- delete route one Contact

const deleteOneContact = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = cerateCipher.decrypt(strNew, Key);

  try {
    await Contact.findOneAndDelete({ _id: decryptId });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

const convertorContact = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = JSON.parse(cerateCipher.decrypt(strNew, Key));

  try {

    //*>---------- handler array contact id for convert to clue

    let contactArray = [];

    for (let index = 0; index < decryptId.length; index++) {
      const contact = await Contact.findOne({ _id: decryptId[index] });

      contactArray.push(contact);

      try {
        //*>----------- create model for data clue

        const duplicate = await Clues.find({
          mobile: contactArray[index].mobile,
        });

        if (duplicate.length) return res.sendStatus(409);

        await Clues.create({
          subject: "ندارد",
          fullName: contactArray[index].fullName,
          role: contactArray[index].role,
          mobile: contactArray[index].mobile,
          industry: contactArray[index].industry,
          expert: contactArray[index].expert,
          expertFullName: contactArray[index].expertFullName,
          company: contactArray[index].company,
          phonNumber: contactArray[index].phonNumber,
          state: contactArray[index].state,
          cities: contactArray[index].cities,
          address: contactArray[index].address,
          qualityCustomer: "ندارد",
          callTime: "ندارد",
        });

        await Contact.findOneAndUpdate(
          { _id: decryptId[index] },
          {
            isActive: false,
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ export method

module.exports = {
  createHandler,
  getAllHandler,
  updateOneContact,
  deleteOneContact,
  convertorContact,
};
