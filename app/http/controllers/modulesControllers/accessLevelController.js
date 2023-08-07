const User = require("app/models/User");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>---------- middleware

const ROLES_LIST = require("../../../config/roles_list");

//*>---------- method get user of userRole

const getUserRole = async (req, res) => {
  let Role = {};
  if (req.query.role) {
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");
    const role = await cerateCipher.decrypt(strRoleNew, Key);

    switch (role) {
      case "User":
        Role = {
          User: 1000,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }
        break;

      case "SeniorManager":
        Role = {
          SeniorManager: 1001,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "Assistant":
        Role = {
          Assistant: 1002,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "LogisticsManager":
        Role = {
          LogisticsManager: 1003,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "LogisticsSpecialist":
        Role = {
          LogisticsSpecialist: 1004,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "ContentManager":
        Role = {
          ContentManager: 1005,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "SalesManager":
        Role = {
          SalesManager: 1007,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "SalesSpecialist":
        Role = {
          SalesSpecialist: 1008,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "FinanceManager":
        Role = {
          FinanceManager: 1009,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "AccountingManager":
        Role = {
          AccountingManager: 1010,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "AccountingAssistant":
        Role = {
          AccountingAssistant: 1011,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "Accountant":
        Role = {
          Accountant: 1012,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "CRMSpecialist":
        Role = {
          CRMSpecialist: 1013,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "CRMManager":
        Role = {
          CRMManager: 1014,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "BusinessManager":
        Role = {
          BusinessManager: 1015,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "BusinessSpecialist":
        Role = {
          BusinessSpecialist: 1016,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "WarehouseManager":
        Role = {
          WarehouseManager: 1017,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "WarehouseSpecialist":
        Role = {
          WarehouseSpecialist: 1018,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "HrManager":
        Role = {
          HrManager: 1019,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      case "HrSpecialist":
        Role = {
          HrSpecialist: 1020,
        };
        try {
          const usersRole = await User.find({ roles: Role });
          const encryptData = cerateCipher.encrypt(
            JSON.stringify(usersRole),
            Key
          );
          res.status(200).json({ encryptData });
        } catch (err) {
          console.log(err.message);
          return res.status(500).json({ message: err });
        }

        break;

      default:
        break;
    }
  }
};

//*>----------- method put for access level for user

const putAccessLevelForUser = async (req, res) => {
  const decryptData = JSON.parse(cerateCipher.decrypt(req.body.dataEnc, Key));
  const accessLevel = decryptData.accessLevel;

  //!----------get first true value of an object and return the corresponding key

  const newAccessLevel = (obj) => Object.keys(obj).find((i) => obj[i] === true);

  switch (newAccessLevel(accessLevel)) {
    case "edit":
      try {
        const userUpdate = await User.findOneAndUpdate(
          { _id: userId },
          {
            accessLevel: {
              edit: true,
              delete: false,
              insert: false,
              fullAccess: false,
            },
          }
        );

        await userUpdate.save();

        res.sendStatus(202);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }

      break;
    case "delete":
      try {
        const userUpdate = await User.findOneAndUpdate(
          { _id: userId },
          {
            accessLevel: {
              edit: false,
              delete: true,
              insert: false,
              fullAccess: false,
            },
          }
        );

        await userUpdate.save();

        res.sendStatus(202);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
      break;
    case "insert":
      try {
        const userUpdate = await User.findOneAndUpdate(
          { _id: userId },
          {
            accessLevel: {
              edit: false,
              delete: false,
              insert: true,
              fullAccess: false,
            },
          }
        );

        await userUpdate.save();

        res.sendStatus(202);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
      break;
    case "fullAccess":
      try {
        const userUpdate = await User.findOneAndUpdate(
          { _id: userId },
          {
            accessLevel: {
              edit: false,
              delete: false,
              insert: false,
              fullAccess: true,
            },
          }
        );

        await userUpdate.save();

        res.sendStatus(202);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
      break;
    default:
      try {
        const userUpdate = await User.findOneAndUpdate(
          { _id: userId },
          {
            accessLevel: {
              edit: false,
              delete: false,
              insert: false,
              fullAccess: false,
            },
          }
        );

        await userUpdate.save();

        res.sendStatus(202);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
      break;
  }
};

//*>------------ export method

module.exports = {
  getUserRole,
  putAccessLevelForUser,
};
