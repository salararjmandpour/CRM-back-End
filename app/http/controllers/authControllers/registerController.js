const User = require("app/models/User");
const FuckingPwd = require("app/models/FuckingPwd");
const bcrypt = require("bcrypt");
const generatePassword = require("app/helpers/generatePassword");



const register = async (req, res) => {
  const { fullName, phoneNumber, email, isActive, username, createdOn } = req.body;
  const password = generatePassword();
  if (!username || !fullName || !phoneNumber || !email || !createdOn) {
    return res
      .status(400);
  }

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    //>----------- create hashed PWD

    const hashedPwd =  await bcrypt.hash(password, 10);

    //>----------- create model for data user

    await User.create({
      username: username,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      isActive: isActive,
      createdOn: createdOn,
      password: hashedPwd,
    });

    //>----------- create model for source PWD

    const fuckingUser = await User.findOne({ username }).exec();

    await FuckingPwd.create({
      username: username,
      password: password,
      user: fuckingUser._id,
    });

    res
      .sendStatus(201);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register };
