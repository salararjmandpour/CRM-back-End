const User = require("app/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { username, password } = req.body;
  if (!username || !password) return res.status(400);
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }

  const recruitment = await foundUser.recruitment;

  if (!recruitment) {
    return res.sendStatus(423);
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.sendStatus(401);

  const roles = Object.values(foundUser.roles).filter(Boolean);

  const accessToken = jwt.sign(
    {
      userInfo: { username: foundUser.username, roles },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const newRefreshToken = jwt.sign(
    {
      userInfo: { username: foundUser.username, roles },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  let newRefreshTokenArray = !cookies?.jwt
    ? foundUser.refreshToken
    : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({ refreshToken }).exec();
    if (!foundToken) {
      newRefreshTokenArray = [];
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  }

  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  foundUser.isActive = true;
  await foundUser.save();

  const encryptData = {
    roles: cerateCipher.encrypt(roles.toString(), Key),
    accessToken: accessToken,
    fullName: cerateCipher.encrypt(foundUser.fullName, Key),
    isActive: cerateCipher.encrypt(foundUser.isActive.toString(), Key),
    _id: cerateCipher.encrypt(foundUser._id.toString(), Key),
    accessLevel: cerateCipher.encrypt(
      JSON.stringify(foundUser.accessLevel),
      Key
    ),
  };

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({
    encryptData,
  });
};

module.exports = { handleLogin };
