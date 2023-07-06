//>---------- encrypt data sending

const cerateCipher = require("../cerateCipher");
const Key = config.encryptionKey;
const ROLES_LIST = require("../../../config/roles_list");


//>---------- verifyRoles

const verifyRoles = (req, res) => {
    const role = cerateCipher.decrypt(req.body.roles, Key);
    if (!role) return res.sendStatus(401);
    const result = ROLES_LIST.find(vary => vary.role === role);
    if (!result) return res.sendStatus(401);
    const encryptData = cerateCipher.encrypt(JSON.stringify(result), Key);
    res.json({ encryptData });
    
  };


module.exports = verifyRoles;
