//>---------- encrypt data sending

const cerateCipher = require("../cerateCipher");
const Key = config.encryptionKey;
const ROLES_LIST = require("../../../config/roles_list");


//>---------- verifyRoles

// const verifyRoles = (req, res) => {
//     const role = cerateCipher.decrypt(req.query.roles, Key);;
//     if (!role) return res.sendStatus(401);
//     const roleInt = parseInt(role);
//     const result = ROLES_LIST.find((vary) => vary.role === roleInt);
//     if (!result) return res.sendStatus(401);
//     const encryptData = cerateCipher.encrypt(JSON.stringify(result), Key);
//     res.json({ encryptData });
    
//   };

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};


module.exports = verifyRoles;
