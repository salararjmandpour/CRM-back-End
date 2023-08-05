const User = require("app/models/User");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>---------- method get all users

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "کاربری پیدا نشد" });

  const encryptData = cerateCipher.encrypt(JSON.stringify(users), Key);
  res.json({ encryptData });
};

//>---------- method get single user for profile

const getSingleUser = async (req, res, next) => {
  let singleUser = cerateCipher.decrypt(req.query.userNameActive, Key);
  singleUser = await User.findOne({ username: parseInt(singleUser) });
  if (!singleUser) return res.sendStatus(204);

  // console.log(singleUser);User

  const encryptData = cerateCipher.encrypt(JSON.stringify(singleUser), Key);

  res.status(200).json({ encryptData });
  next();
};

module.exports = { getAllUsers, getSingleUser };
