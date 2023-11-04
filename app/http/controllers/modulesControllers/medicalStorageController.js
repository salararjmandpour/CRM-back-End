const User = require("app/models/User");
const MedicalStorage = require("app/models/medicalStorage");

const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- create function search in medical storage

const searchMedicalStorage = async (req, res) => {
  //*>--------- search by name product
  if (req.query.searchName) {
    const strSearch = req.query.searchName.toString();
    const strSearchNew = strSearch.replaceAll(" ", "+");
    const decryptSearch = await cerateCipher.decrypt(strSearchNew, Key);

    try {
      const products = await MedicalStorage.find({
        nameProduct: { $regex: decryptSearch, $options: "i" }, // Case-insensitive search
      }).limit(20);

      const encryptProducts = cerateCipher.encrypt(
        JSON.stringify(products),
        Key
      );
      return res.status(202).json({ encryptProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
  //*>----------- search by SKU product
  else {
    const strSku = req.query.searchSku.toString();
    const strSkuNew = strSku.replaceAll(" ", "+");
    const decryptSearchSku = await cerateCipher.decrypt(strSkuNew, Key);

    try {
      const sku = await MedicalStorage.find({
        sku: { $regex: decryptSearchSku, $options: "i" },
      }).limit(20);

      const encryptProducts = cerateCipher.encrypt(JSON.stringify(sku), Key);

      return res.status(202).json({ encryptProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

//*>------------ export method

module.exports = {
  searchMedicalStorage,
};
