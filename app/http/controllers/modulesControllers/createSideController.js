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
    }
  }
};

//*>----------- method put for create Side of user

const createSide = async (req, res) => {
  let newRole = {};

  const decryptData = JSON.parse(cerateCipher.decrypt(req.body.dataEnc, Key));
  if (!decryptData.roles && !decryptData.userId) return res.sendStatus(404);

  switch (decryptData.roles) {
    case "SeniorManager":
      newRole = {
        SeniorManager: 1001,
      };
      break;
    case "Assistant":
      newRole = {
        Assistant: 1002,
      };
      break;
    case "LogisticsManager":
      newRole = {
        LogisticsManager: 1003,
      };
      break;
    case "LogisticsSpecialist":
      newRole = {
        LogisticsSpecialist: 1004,
      };
      break;
    case "ContentManager":
      newRole = {
        ContentManager: 1005,
      };
      break;
    case "SalesManager":
      newRole = {
        SalesManager: 1007,
      };
      break;
    case "SalesSpecialist":
      newRole = {
        SalesSpecialist: 1008,
      };
      break;
    case "FinanceManager":
      newRole = {
        FinanceManager: 1009,
      };
      break;
    case "AccountingManager":
      newRole = {
        AccountingManager: 1010,
      };
      break;
    case "AccountingAssistant":
      newRole = {
        AccountingAssistant: 1011,
      };
      break;
    case "Accountant":
      newRole = {
        Accountant: 1012,
      };
      break;
    case "CRMSpecialist":
      newRole = {
        CRMSpecialist: 1013,
      };
      break;
    case "CRMManager":
      newRole = {
        CRMManager: 1014,
      };
      break;
    case "BusinessManager":
      newRole = {
        BusinessManager: 1015,
      };
      break;
    case "BusinessSpecialist":
      newRole = {
        BusinessSpecialist: 1016,
      };
      break;
    case "WarehouseManager":
      newRole = {
        WarehouseManager: 1017,
      };
      break;
    case "WarehouseSpecialist":
      newRole = {
        WarehouseSpecialist: 1018,
      };
      break;
    case "HrManager":
      newRole = {
        HrManager: 1019,
      };
      break;
    case "HrSpecialist":
      newRole = {
        HrSpecialist: 1020,
      };
      break;
    default:
      res.status(409).json({
        message: "Send a valid state name with `state` parameter",
      });
      break;
  }

  try {
    const userUpdate = await User.findOneAndUpdate(
      { _id: decryptData.userId },
      {
        roles: newRole,
      }
    );

    await userUpdate.save();

    res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ export method

module.exports = {
  getUserRole,
  createSide,
};
