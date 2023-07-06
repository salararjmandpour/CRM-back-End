const User = require("app/models/User");
const jwt = require("jsonwebtoken");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return;

        const hackedUser = await User.findOne({
          username: decoded.username,
        }).exec();

        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    );
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }

      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      const roles = Object.values(foundUser.roles);

      const accessToken = jwt.sign(
        {
          userInfo: { username: decoded.username, roles },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );

      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      const encryptData = {
        roles: cerateCipher.encrypt(roles.toString(), Key),
        accessToken: accessToken,
        fullName: cerateCipher.encrypt(foundUser.fullName, Key),
        isActive: cerateCipher.encrypt(foundUser.isActive.toString()),
        Key,
      };

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ encryptData });
    }
  );
};

module.exports = { handleRefreshToken };
