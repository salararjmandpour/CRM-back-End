const User = require("app/models/User");
const Clues = require("app/models/Clue");
const CampaignMain = require("app/models/CampaignMain");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>----------- post route campaign

const createHandler = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );
  const expertDecrypt = await cerateCipher.decrypt(req.body.getId.userId, Key);
  let expertFullName = await User.findOne({ _id: expertDecrypt });
  expertFullName = expertFullName.fullName;

  const {
    campaignName,
    campaignStatus,
    campaignTimeStart,
    campaignTimeEnd,
    campaignKind,
    campaignNumberOfContacts,
    campaignResponse,
    campaignMoney,
    campaignIncome,
    campaignCost,
    campaignGoal,
    campaignNote,
  } = dataDecrypt;

  if (
    !campaignName ||
    !campaignStatus ||
    !campaignTimeStart ||
    !campaignTimeEnd ||
    !campaignKind ||
    !campaignNumberOfContacts ||
    !campaignResponse ||
    !expertFullName ||
    !campaignMoney ||
    !campaignIncome ||
    !campaignCost ||
    !campaignGoal ||
    !campaignNote
  ) {
    return res.sendStatus(400);
  }

  try {

    //>----------- create model for data campaign 

    await CampaignMain.create({
      campaignName: campaignName,
      campaignStatus: campaignStatus,
      campaignTimeStart: campaignTimeStart,
      campaignTimeEnd: campaignTimeEnd,
      campaignKind: campaignKind,
      campaignNumberOfContacts: campaignNumberOfContacts,
      campaignResponse: campaignResponse,
      campaignMoney: campaignMoney,
      campaignIncome: campaignIncome,
      campaignCost: campaignCost,
      campaignGoal: campaignGoal,
      campaignNote: campaignNote,
      userFullName:expertFullName,
      userId: expertDecrypt,
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//>---------- get data campaign all 

const getSingleAndAllHandler = async (req, res) => {
  const campaignMain = await CampaignMain.find({});

  const strIds = req.query.id.toString();
      const strIdsNew = strIds.replaceAll(" ", "+");
  const decryptClueIds = JSON.parse(cerateCipher.decrypt(strIdsNew, Key));
  console.log(decryptClueIds);

//   const clues = await Clues.find({
//     _id: decryptClueIds,
//   });

// console.log(clues);


  if (!campaignMain || campaignMain.length == 0)
    return res.status(304).send("هیچ کمپینی وجود ندارد");

  const encryptData = cerateCipher.encrypt(JSON.stringify(campaignMain), Key);
  return res.status(202).json({
    encryptData,
  });
};
//>------------ export method

module.exports = { createHandler, getSingleAndAllHandler };
