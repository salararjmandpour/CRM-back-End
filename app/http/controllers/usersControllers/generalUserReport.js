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
    let countActivitySalesMeet;
    let countActivityCluesTellOpen;
    let countActivitySalesTellOpen;
    let countActivityCluesMeetSuccessful;
    let countActivitySalesMeetSuccessful;
    let countActivityCluesTellSuccessful;
    let countActivitySalesTellSuccessful;
    let RefractiveIndexMeetClues;
    let successRateMeetClues;
    // "$or":
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

      const allActivityCluesMeetSuccessful =
        await ActivityCluesMeetOpen.countDocuments({
          $and: [
            { "stepMeet.isActive": true },
            { "stepMeet.evaluation": true },
            { "stepMeet.PreliminaryNegotiations": true },
          ],
        });

      const allActivityCluesMeetUnsuccessful =
        await ActivityCluesMeetOpen.countDocuments({
          $and: [
            { "stepMeet.isActive": true },
            { "stepMeet.evaluation": false },
            { "stepMeet.PreliminaryNegotiations": false },
          ],
        });

      const allActivityCluesTellSuccessful =
        await ActivityCluesTellOpen.countDocuments({
          $and: [
            { "stepTell.isActive": true },
            { "stepTell.evaluation": true },
            { "stepTell.PreliminaryNegotiations": true },
          ],
        });

      const allActivityCluesTellUnsuccessful =
        await ActivityCluesTellOpen.countDocuments({
          $and: [
            { "stepTell.isActive": true },
            { "stepTell.evaluation": false },
            { "stepTell.PreliminaryNegotiations": false },
          ],
        });

      const allActivitySalesMeetSuccessful =
        await ActivitySaleMeetOpen.countDocuments({
          $and: [{ "status.isActive": true }, { "status.successful": true }],
        });

      const allActivitySalesMeetUnsuccessful =
        await ActivitySaleMeetOpen.countDocuments({
          $and: [{ "status.isActive": true }, { "status.Unsuccessful": true }],
        });

      const allActivitySalesTellSuccessful =
        await ActivitySaleTellOpen.countDocuments({
          $and: [{ "status.isActive": true }, { "status.successful": true }],
        });

      const allActivitySalesTellUnsuccessful =
        await ActivitySaleTellOpen.countDocuments({
          $and: [{ "status.isActive": true }, { "status.Unsuccessful": true }],
        });

    RefractiveIndexMeetClues = `${
    ((allActivityCluesMeetUnsuccessful / allActivityCluesMeet) * 100).toFixed(2)
      }%`;

      console.log(RefractiveIndexMeetClues);
      console.log(allActivityCluesMeetUnsuccessful);
      console.log(allActivityCluesMeetSuccessful);

      countClues = allClue;
      countActivityCluesMeet = allActivityCluesMeet;
      countActivityCluesTellOpen = allActivityCluesTellOpen;
      countActivitySalesMeet = allActivitySalesMeet;
      countActivitySalesTellOpen = allActivitySalesTellOpen;
      countActivityCluesMeetSuccessful = allActivityCluesMeetSuccessful;
      countActivitySalesMeetSuccessful = allActivitySalesMeetSuccessful;
      countActivityCluesTellSuccessful = allActivityCluesTellSuccessful;
      countActivitySalesTellSuccessful = allActivitySalesTellSuccessful;
    }

    //*>----------  get find by user data
    else {
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

      const userActivityCluesMeetSuccessful =
        await ActivityCluesMeetOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "stepMeet.isActive": true },
            { "stepMeet.evaluation": true },
            { "stepMeet.PreliminaryNegotiations": true },
          ],
        });

      const userActivityCluesTellSuccessful =
        await ActivityCluesTellOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "stepTell.isActive": true },
            { "stepTell.evaluation": true },
            { "stepTell.PreliminaryNegotiations": true },
          ],
        });

      const userActivitySalesMeetSuccessful =
        await ActivitySaleMeetOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "status.isActive": true },
            { "status.successful": true },
          ],
        });

      const userActivitySalesTellSuccessful =
        await ActivitySaleTellOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "status.isActive": true },
            { "status.successful": true },
          ],
        });

      countClues = userClue;
      countActivityCluesMeet = userActivityCluesMeet;
      countActivityCluesTellOpen = userActivityCluesTellOpen;
      countActivitySalesMeet = userActivitySalesMeet;
      countActivitySalesTellOpen = userActivitySalesTellOpen;
      countActivityCluesMeetSuccessful = userActivityCluesMeetSuccessful;
      countActivitySalesMeetSuccessful = userActivitySalesMeetSuccessful;
      countActivityCluesTellSuccessful = userActivityCluesTellSuccessful;
      countActivitySalesTellSuccessful = userActivitySalesTellSuccessful;
    }
    try {
      countAll = {
        countClues,
        countActivityCluesMeet,
        countActivitySalesMeet,
        countActivityCluesTellOpen,
        countActivitySalesTellOpen,
        countActivityCluesMeetSuccessful,
        countActivitySalesMeetSuccessful,
        countActivityCluesTellSuccessful,
        countActivitySalesTellSuccessful,
        RefractiveIndexMeetClues,
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
