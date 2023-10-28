const User = require("app/models/User");
const Clues = require("app/models/Clue");
const CampaignMain = require("app/models/CampaignMain");
const ActivityCluesMeetOpen = require("app/models/ActivityCluesMeetOpen");
const ActivityCluesTellOpen = require("app/models/ActivityCluesTellOpen");
const ActivitySaleMeetOpen = require("app/models/ActivitySaleMeetOpen");
const ActivitySaleTellOpen = require("app/models/ActivitySaleTellOpen");
const Sale = require("app/models/Sale");
const InquiryOfPrice = require("app/models/InquiryOfPrice");
const Invoice = require("app/models/Invoice");
const DutiesSale = require("app/models/DutiesSale");
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
    let allUsers;
    let countClues;
    let countSales;
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
    let countInquiryOfPrice;
    let countInvoice;
    let countDutiesSale;
    let countDutiesSaleSuccessful;
    let RefractiveIndexDutiesSale;
    let successRateDutiesSale;
    //*>----------- get find all data for report

    if (!strIdNew && !strRoleNew) return res.sendStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    if (ROLES_LIST.SeniorManager == decryptUserRole&& req.query.filter==="false") {
      const allUser = await User.find({});

      const allClue = await Clues.countDocuments({});

      const allSale = await Sale.countDocuments({});

      const allInquiryOfPrice = await InquiryOfPrice.countDocuments({});

      const allInvoice = await Invoice.countDocuments({});

      const allDutiesSale = await DutiesSale.countDocuments({});

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

      const allDutiesSaleSuccessful = await DutiesSale.countDocuments({
        $and: [{ "status.isActive": true }, { "status.successful": true }],
      });

      const allDutiesSaleUnsuccessful = await DutiesSale.countDocuments({
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

      RefractiveIndexDutiesSale = `${(
        (allDutiesSaleUnsuccessful / allDutiesSale) *
        100
      ).toFixed(2)}%`;

      successRateDutiesSale = `${(
        (allDutiesSaleSuccessful / allDutiesSale) *
        100
      ).toFixed(2)}%`;

      //*>--------- value

      countClues = allClue;
      countSales = allSale;
      allUsers = allUser;
      countActivityCluesMeet = allActivityCluesMeet;
      countActivityCluesTellOpen = allActivityCluesTellOpen;
      countActivitySalesMeet = allActivitySalesMeet;
      countActivitySalesTellOpen = allActivitySalesTellOpen;
      countActivityCluesMeetSuccessful = allActivityCluesMeetSuccessful;
      countActivitySalesMeetSuccessful = allActivitySalesMeetSuccessful;
      countActivityCluesTellSuccessful = allActivityCluesTellSuccessful;
      countActivitySalesTellSuccessful = allActivitySalesTellSuccessful;
      countInquiryOfPrice = allInquiryOfPrice;
      countInvoice = allInvoice;
      countDutiesSale = allDutiesSale;
      countDutiesSaleSuccessful = allDutiesSaleSuccessful;
    }

    //*>----------  get find by user data for report
    else {
      const allUser = await User.find({});

      const userClue = await Clues.countDocuments({ expert: decryptUserId });

      const userSale = await Sale.countDocuments({ expert: decryptUserId });

      countCampaign = await CampaignMain.countDocuments({});

      const userInquiryOfPrice = await InquiryOfPrice.countDocuments({
        expert: decryptUserId,
      });

      const userInvoice = await Invoice.countDocuments({
        expert: decryptUserId,
      });

      const userDutiesSale = await DutiesSale.countDocuments({
        userId: decryptUserId,
      });

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

      const userDutiesSaleSuccessful = await DutiesSale.countDocuments({
        $and: [
          { userId: decryptUserId },
          { "status.isActive": true },
          { "status.successful": true },
        ],
      });

      const userDutiesSaleUnsuccessful = await DutiesSale.countDocuments({
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

      RefractiveIndexDutiesSale = `${(
        (userDutiesSaleUnsuccessful / userDutiesSale) *
        100
      ).toFixed(2)}%`;

      successRateDutiesSale = `${(
        (userDutiesSaleSuccessful / userDutiesSale) *
        100
      ).toFixed(2)}%`;

      //*>--------- value

      allUsers = allUser;
      countClues = userClue;
      countSales = userSale;
      countActivityCluesMeet = userActivityCluesMeet;
      countActivityCluesTellOpen = userActivityCluesTellOpen;
      countActivitySalesMeet = userActivitySalesMeet;
      countActivitySalesTellOpen = userActivitySalesTellOpen;
      countActivityCluesMeetSuccessful = userActivityCluesMeetSuccessful;
      countActivitySalesMeetSuccessful = userActivitySalesMeetSuccessful;
      countActivityCluesTellSuccessful = userActivityCluesTellSuccessful;
      countActivitySalesTellSuccessful = userActivitySalesTellSuccessful;
      countInquiryOfPrice = userInquiryOfPrice;
      countInvoice = userInvoice;
      countDutiesSale = userDutiesSale;
      countDutiesSaleSuccessful = userDutiesSaleSuccessful;
    }
    try {
      countAll = {
        allUsers,
        countClues,
        countSales,
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
        countInquiryOfPrice,
        countInvoice,
        countDutiesSale,
        RefractiveIndexDutiesSale,
        successRateDutiesSale,
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
