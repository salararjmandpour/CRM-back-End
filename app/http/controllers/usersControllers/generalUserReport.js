const Clues = require("app/models/Clue");
const ActivityCluesMeetOpen = require("app/models/ActivityCluesMeetOpen");
const ActivityCluesTellOpen = require("app/models/ActivityCluesTellOpen");
const ActivitySaleMeetOpen = require("app/models/ActivitySaleMeetOpen");
const ActivitySaleTellOpen = require("app/models/ActivitySaleTellOpen");
const CampaignMain = require("app/models/CampaignMain");
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

    //*>---------- value

    let countAll;
    let countClues;
    let countCampaign;
    let countActivityCluesMeet;
    let countActivitySalesMeet;
    let countActivityCluesTellOpen;
    let countActivitySalesTellOpen;
    let countActivityCluesMeetSuccessful;
    let countActivitySalesMeetSuccessful;
    let countActivityCluesTellSuccessful;
    let countActivitySalesTellSuccessful;
    let RefractiveIndexMeetClues;
    let RefractiveIndexMeetSales;
    let RefractiveIndexTellClues;
    let RefractiveIndexTellSales;
    let successRateMeetClues;
    let successRateMeetSales;
    let successRateTellClues;
    let successRateTellSales;

    //*>----------- get find all data for report

    if (!strIdNew && !strRoleNew) return res.sensStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);
    if (ROLES_LIST.SeniorManager == decryptUserRole) {

      const allClue = await Clues.countDocuments({});

      countCampaign = await CampaignMain.countDocuments({});

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

      //*>---------- Coefficient

      RefractiveIndexMeetClues = `${(
        (allActivityCluesMeetUnsuccessful / allActivityCluesMeet) *
        100
      ).toFixed(2)}%`;

      successRateMeetClues = `${(
        (allActivityCluesMeetSuccessful / allActivityCluesMeet) *
        100
      ).toFixed(2)}%`;

      RefractiveIndexMeetSales = `${(
        (allActivitySalesMeetUnsuccessful / allActivitySalesMeet) *
        100
      ).toFixed(2)}%`;

      successRateMeetSales = `${(
        (allActivitySalesMeetSuccessful / allActivitySalesMeet) *
        100
      ).toFixed(2)}%`;

      RefractiveIndexTellClues = `${(
        (allActivityCluesTellUnsuccessful / allActivityCluesTellOpen) *
        100
      ).toFixed(2)}%`;

      successRateTellClues = `${(
        (allActivityCluesTellSuccessful / allActivityCluesTellOpen) *
        100
      ).toFixed(2)}%`;

      RefractiveIndexTellSales = `${(
        (allActivitySalesTellUnsuccessful / allActivitySalesTellOpen) *
        100
      ).toFixed(2)}%`;

      successRateTellSales = `${(
        (allActivitySalesTellSuccessful / allActivitySalesTellOpen) *
        100
      ).toFixed(2)}%`;

      //*>--------- value

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

    //*>----------  get find by user data for report
    else {
      const userClue = await Clues.countDocuments({ expert: decryptUserId });

      countCampaign = await CampaignMain.countDocuments({});

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

      const userActivityCluesMeetUnsuccessful =
        await ActivityCluesMeetOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "stepMeet.isActive": true },
            { "stepMeet.evaluation": false },
            { "stepMeet.PreliminaryNegotiations": false },
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

      const userActivityCluesTellUnsuccessful =
        await ActivityCluesTellOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "stepTell.isActive": true },
            { "stepTell.evaluation": false },
            { "stepTell.PreliminaryNegotiations": false },
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

      const userActivitySalesMeetUnsuccessful =
        await ActivitySaleMeetOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "status.isActive": true },
            { "status.Unsuccessful": true },
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

      const userActivitySalesTellUnsuccessful =
        await ActivitySaleTellOpen.countDocuments({
          $and: [
            { userId: decryptUserId },
            { "status.isActive": true },
            { "status.Unsuccessful": true },
          ],
        });

      //*>---------- Coefficient

      RefractiveIndexMeetClues = `${(
        (userActivityCluesMeetUnsuccessful / userActivityCluesMeet) *
        100
      ).toFixed(2)}%`;

      successRateMeetClues = `${(
        (userActivityCluesMeetSuccessful / userActivityCluesMeet) *
        100
      ).toFixed(2)}%`;

      RefractiveIndexMeetSales = `${(
        (userActivitySalesMeetUnsuccessful / userActivitySalesMeet) *
        100
      ).toFixed(2)}%`;

      successRateMeetSales = `${(
        (userActivitySalesMeetSuccessful / userActivitySalesMeet) *
        100
      ).toFixed(2)}%`;

      RefractiveIndexTellClues = `${(
        (userActivityCluesTellUnsuccessful / userActivityCluesTellOpen) *
        100
      ).toFixed(2)}%`;

      successRateTellClues = `${(
        (userActivityCluesTellSuccessful / userActivityCluesTellOpen) *
        100
      ).toFixed(2)}%`;

      RefractiveIndexTellSales = `${(
        (userActivitySalesTellUnsuccessful / userActivitySalesTellOpen) *
        100
      ).toFixed(2)}%`;

      successRateTellSales = `${(
        (userActivitySalesTellSuccessful / userActivitySalesTellOpen) *
        100
      ).toFixed(2)}%`;

      //*>--------- value

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
        countCampaign,
        countActivityCluesMeet,
        countActivitySalesMeet,
        countActivityCluesTellOpen,
        countActivitySalesTellOpen,
        countActivityCluesMeetSuccessful,
        countActivitySalesMeetSuccessful,
        countActivityCluesTellSuccessful,
        countActivitySalesTellSuccessful,
        RefractiveIndexMeetClues,
        RefractiveIndexMeetSales,
        RefractiveIndexTellClues,
        RefractiveIndexTellSales,
        successRateMeetClues,
        successRateMeetSales,
        successRateTellClues,
        successRateTellSales,
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
