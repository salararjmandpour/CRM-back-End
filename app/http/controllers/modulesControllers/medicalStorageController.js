const User = require("app/models/User");
const MedicalStorage = require("app/models/medicalStorage");

const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- create function search in medical storage

const searchMedicalStorage = async (req, res) => {
  const strSearch = req.query.search.toString();
  const strSearchNew = strSearch.replaceAll(" ", "+");
  const decryptSearch = await cerateCipher.decrypt(strSearchNew, Key);

  console.log(decryptSearch);

  try {
    const products = await MedicalStorage.find({
      nameProduct: { $regex: decryptSearch, $options: "i" }, // Case-insensitive search
      sku: { $regex: decryptSearch, $options: "i" },
    }).limit(10);

    const encryptProducts = cerateCipher.encrypt(JSON.stringify(products), Key);
    return res.status(202).json({ encryptProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//*>------------ export method

module.exports = {
  searchMedicalStorage,
};
