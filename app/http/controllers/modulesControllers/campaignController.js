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
      userFullName: expertFullName,
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
  //>---------- get clues by id for set selective campaign

  if (req.query.id && req.query.idCamp) {
    const strIds = req.query.id.toString();
    const strIdsNew = strIds.replaceAll(" ", "+");
    const strIdCamp = req.query.idCamp.toString();
    const strIdCampNew = strIdCamp.replaceAll(" ", "+");
    const decryptIdCamp = cerateCipher.decrypt(strIdCampNew, Key);
    const decryptClueIds = JSON.parse(cerateCipher.decrypt(strIdsNew, Key));

    try {
      //>------------ search clue in campaign
      const campaign = await CampaignMain.findOne({ _id: decryptIdCamp });
      const result = campaign.clues.some((item) =>
        decryptClueIds.includes(item)
      );

      if (result)
        return res.status(404).json({
          message: "رکورد مورد نظر تکراری میباشد",
          status: 404,
        });

      //>---------- end search clue

      if (!result) {
        const updateCamp = await CampaignMain.findOneAndUpdate(
          {
            _id: decryptIdCamp,
          },
          {
            $push: { clues: decryptClueIds },
          }
        );
        await updateCamp.save();
        for (let index = 0; index < decryptClueIds.length; index++) {
          const updateClue = await Clues.findOneAndUpdate(
            {
              _id: decryptClueIds[index],
            },
            {
              $push: { campaign: decryptIdCamp },
            }
          );
          await updateClue.save();
        }
        const clues = await Clues.find({
          _id: decryptClueIds,
        });

        const campaignMain = await CampaignMain.find({ _id: decryptIdCamp });
        const encryptClues = cerateCipher.encrypt(JSON.stringify(clues), Key);
        const encryptData = cerateCipher.encrypt(
          JSON.stringify(campaignMain),
          Key
        );
        return res.status(202).json({
          encryptData,
          encryptClues,
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //>---------- get single campaign and get clues for campaign

  if (req.query.idCamp) {
    try {
      const strIdCamp = req.query.idCamp.toString();
      const strIdCampNew = strIdCamp.replaceAll(" ", "+");
      const decryptIdCamp = cerateCipher.decrypt(strIdCampNew, Key);
      const campaignMain = await CampaignMain.find({ _id: decryptIdCamp });

      const clues = await Clues.find({
        _id: campaignMain.clues || campaignMain[0].clues,
      });

      const encryptClues = cerateCipher.encrypt(JSON.stringify(clues), Key);
      const encryptData = cerateCipher.encrypt(
        JSON.stringify(campaignMain),
        Key
      );

      //>----------- get campaign is not clues

      if (clues.length == 0) {
        return res.status(202).json({
          status: 404,
          encryptData,
        });
      }
      return res.status(202).json({
        encryptData,
        encryptClues,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //>----------- get all campaign

  if (!req.query.id && !req.query.idCamp) {
    const campaignMain = await CampaignMain.find({});

    if (!campaignMain || campaignMain.length == 0)
      return res.status(404).json({
        status: 404,
        message: "هیچ کمپینی وجود ندارد",
      });

    const encryptData = cerateCipher.encrypt(JSON.stringify(campaignMain), Key);

    return res.status(202).json({
      encryptData,
    });
  }
};

//>---------- method delete campaign compleat

//>------------ export method

module.exports = { createHandler, getSingleAndAllHandler };
