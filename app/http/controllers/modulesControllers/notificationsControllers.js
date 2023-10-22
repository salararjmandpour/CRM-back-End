const User = require("app/models/User");
const Clues = require("app/models/Clue");
const ActivityCluesMeetOpen = require("app/models/ActivityCluesMeetOpen");
const ActivityCluesTellOpen = require("app/models/ActivityCluesTellOpen");
const DutiesSale = require("app/models/DutiesSale");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>---------- create get method by user id

const getNotifications = async (req, res) => {
  const strUserId = req.query.userId.toString();
  const strUserIdNew = strUserId.replaceAll(" ", "+");

  const decryptUserId = cerateCipher.decrypt(strUserIdNew, Key);

  try {
    //*>----------- get model for data  activity clue meet open

    let findDutiesSale = await DutiesSale.find(
      {
        userId: decryptUserId,
        "status.isActive": false,
      },
      {
        _id: 0,
        subjectForDuties: 0,
        explainForDuties: 0,
        dateForDuties: 0,
        timeForDuties: 0,
        createdAt: 0,
        isActive: 0,
        updatedAt: 0,
        userId: 0,
        __v: 0,
      }
    );

    let findClueMeet = await ActivityCluesMeetOpen.find(
      {
        userId: decryptUserId,
        "stepMeet.isActive": false,
      },
      {
        _id: 0,
        activityNote: 0,
        activityLocation: 0,
        cancelationReason: 0,
        createdAt: 0,
        isActive: 0,
        updatedAt: 0,
        userId: 0,
        __v: 0,
      }
    );

    let findClueTell = await ActivityCluesTellOpen.find(
      {
        userId: decryptUserId,
        "stepTell.isActive": false,
      },
      {
        _id: 0,
        activityTellNote: 0,
        createdAt: 0,
        isActive: 0,
        cancelationReason: 0,
        updatedAt: 0,
        userId: 0,
        __v: 0,
      }
    );

    const encryptDataMeet = cerateCipher.encrypt(
      JSON.stringify(findClueMeet),
      Key
    );
    const encryptDataTell = cerateCipher.encrypt(
      JSON.stringify(findClueTell),
      Key
    );
    const encryptDataDutiesSale = cerateCipher.encrypt(
      JSON.stringify(findDutiesSale),
      Key
    );

    return res
      .status(200)
      .json({ encryptDataMeet, encryptDataTell, encryptDataDutiesSale });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ export method

module.exports = {
  getNotifications,
};
