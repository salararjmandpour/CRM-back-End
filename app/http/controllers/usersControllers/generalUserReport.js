const Clues = require("app/models/Clue");
const ActivityCluesMeetOpen = require("app/models/ActivityCluesMeetOpen");
const ActivityCluesTellOpen = require("app/models/ActivityCluesTellOpen");
const ActivitySaleMeetOpen = require("app/models/ActivitySaleMeetOpen");
const ActivitySaleTellOpen = require("app/models/ActivitySaleTellOpen");
const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>---------- create method for get find all data
const getFindAllClue = async (req, res) => {
  if (req.query.role && req.query.id) {
    const strId = req.query.id.toString();
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");
    const strIdNew = strId.replaceAll(" ", "+");
    let countAll;
    let countClues;
    let countActivityCluesMeet;
    let countActivityCluesTellOpen;
    let countActivitySalesMeet;
    let countActivitySalesTellOpen;
    if (!strIdNew && !strRoleNew) return res.sensStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);
    if (ROLES_LIST.SeniorManager == decryptUserRole) {
      const allClue = await Clues.countDocuments({});
      const allActivityCluesMeet = await ActivityCluesMeetOpen.countDocuments(
        {}
      );
      const allActivityCluesTellOpen =
        await ActivityCluesTellOpen.countDocuments({});
      const allActivitySalesMeet = await ActivitySaleMeetOpen.countDocuments(
        {}
      );
      const allActivitySalesTellOpen =
        await ActivitySaleTellOpen.countDocuments({});

      countClues = allClue;
      countActivityCluesMeet = allActivityCluesMeet;
      countActivityCluesTellOpen = allActivityCluesTellOpen;
      countActivitySalesMeet = allActivitySalesMeet;
      countActivitySalesTellOpen = allActivitySalesTellOpen;
    } else {
      const userClue = await Clues.countDocuments({ expert: decryptUserId });
      const userActivityCluesMeet = await ActivityCluesMeetOpen.countDocuments({
        userId: decryptUserId,
      });
      const userActivityCluesTellOpen =
        await ActivityCluesTellOpen.countDocuments({ userId: decryptUserId });

      const userActivitySalesMeet = await ActivitySaleMeetOpen.countDocuments({
        userId: decryptUserId,
      });
      const userActivitySalesTellOpen =
        await ActivitySaleTellOpen.countDocuments({ userId: decryptUserId });

      countClues = userClue;
      countActivityCluesMeet = userActivityCluesMeet;
      countActivityCluesTellOpen = userActivityCluesTellOpen;
      countActivitySalesMeet = userActivitySalesMeet;
      countActivitySalesTellOpen = userActivitySalesTellOpen;
    }
    try {
      countAll = {
        countClues,
        countActivityCluesMeet,
        countActivitySalesMeet,
        countActivityCluesTellOpen,
        countActivitySalesTellOpen,
      };
      const encryptCountAllData = cerateCipher.encrypt(
        JSON.stringify(countAll),
        Key
      );
      return res.status(200).json({ encryptCountAllData });
    } catch (error) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

module.exports = { getFindAllClue };
