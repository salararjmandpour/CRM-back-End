const User = require("app/models/User");
const FuckingPwd = require("app/models/FuckingPwd");
const bcrypt = require("bcrypt");
const generatePassword = require("app/helpers/generatePassword");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- create method for create USER

const register = async (req, res) => {
  const { fullName, phoneNumber, email, isActive, username, createdOn } =
    req.body;
  const password = generatePassword();
  if (!username || !fullName || !phoneNumber || !email || !createdOn) {
    return res.status(400);
  }

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    //*>----------- create hashed PWD

    const hashedPwd = await bcrypt.hash(password, 10);

    //*>----------- create model for data user

    await User.create({
      username: username,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      isActive: isActive,
      createdOn: createdOn,
      password: hashedPwd,
      roles: {
        User: 1000,
      },
    });

    //*>----------- create model for source PWD

    const fuckingUser = await User.findOne({ username }).exec();

    await FuckingPwd.create({
      username: username,
      password: password,
      user: fuckingUser._id,
    });

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//*>----------- create method update password for user

const editUserPasswordByAdmin = async (req, res) => {

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  const { fullName, id, password } = dataDecrypt;

  if (!fullName || !id || !password) {
    return res.status(400);
  }

  try {
    //*>----------- update hashed PWD

    const hashedPwd = await bcrypt.hash(password, 10);

    // *>----------- create model for data user

    const updatePass = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        password: hashedPwd,
      }
    );

    //*>----------- update model for source PWD

    const updateFuckingPwd = await FuckingPwd.findOneAndUpdate(
      {
        user: id,
      },
      {
        password,
      }
    );

    await updatePass.save();
    await updateFuckingPwd.save();

    res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register, editUserPasswordByAdmin };
