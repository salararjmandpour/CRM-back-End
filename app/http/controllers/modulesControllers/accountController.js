const User = require("app/models/User");
const Clues = require("app/models/Clue");
const Account = require("app/models/Account");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- post route account

const createHandler = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  const { industry, company, phonNumber, state, cities, address } = dataDecrypt;

  if (!industry || !company || !phonNumber || !state || !cities || !address)
    return res.status(400);

  const duplicate = await Account.findOne({ phonNumber }).exec();

  if (duplicate) {
    return res.status(409).json({
      message: "شماره ثابت تکراری می باشد لطفا بررسی کنید ):",
    });
  }

  try {
    //*>----------- create model for data account

    await Account.create({
      industry,
      company,
      phonNumber,
      state,
      cities,
      address,
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ export method

module.exports = {
  createHandler,
};
