const User = require("app/models/User");
const Clues = require("app/models/Clue");
const CampaignMain = require("app/models/CampaignMain");
const NoteClues = require("app/models/NoteClues");
const ActivityCluesMeetOpen = require("app/models/ActivityCluesMeetOpen");
const ActivityCluesTellOpen = require("app/models/ActivityCluesTellOpen");
const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- post route clue

const createHandler = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  if (req.body.getId.userId && !req.body.getId.clueId) {
    const expertDecrypt = await cerateCipher.decrypt(
      req.body.getId.userId,
      Key
    );
    let expertFullName = await User.findOne({ _id: expertDecrypt });
    expertFullName = expertFullName.fullName;

    const {
      subject,
      fullName,
      role,
      mobile,
      industry,
      company,
      phonNumber,
      state,
      cities,
      address,
      qualityCustomer,
      callTime,
    } = dataDecrypt;

    if (
      !subject ||
      !fullName ||
      !role ||
      !mobile ||
      !industry ||
      !expertDecrypt ||
      !expertFullName ||
      !company ||
      !phonNumber ||
      !state ||
      !cities ||
      !address ||
      !callTime ||
      !qualityCustomer
    ) {
      return res.status(400);
    }

    const duplicate = await Clues.findOne({ mobile, phonNumber }).exec();

    if (duplicate) return res.status(409);

    try {
      //*>----------- create model for data clue

      await Clues.create({
        subject: subject,
        fullName: fullName,
        role: role,
        mobile: mobile,
        industry: industry,
        expert: expertDecrypt,
        expertFullName: expertFullName,
        company: company,
        phonNumber: phonNumber,
        state: state,
        cities: cities,
        address: address,
        qualityCustomer: qualityCustomer,
        callTime: callTime,
      });

      res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //*>------------- handel create note clue by user

  if (req.body.getId.clueId && req.body.getId.userId) {
    const clueDecrypt = await cerateCipher.decrypt(req.body.getId.clueId, Key);
    const expertDecrypt = await cerateCipher.decrypt(
      req.body.getId.userId,
      Key
    );

    const clueName = await Clues.findOne({ _id: clueDecrypt });

    const {
      noteSubject,
      noteBody,
      activitySubject,
      activityNote,
      activityLocation,
      activityTime,
      activityDate,
      activityTellSubject,
      activityTellNote,
      activityTellTime,
      activityTellDate,
    } = dataDecrypt;

    if (noteSubject) {
      if (!noteSubject || !dataDecrypt || !clueDecrypt || !expertDecrypt)
        return res.status(400);

      try {
        //*>----------- create model for data  note clue
        await NoteClues.create({
          noteSubject: noteSubject,
          noteBody: noteBody,
          userId: expertDecrypt,
          clueId: clueDecrypt,
        });

        res.sendStatus(201);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
    } else if (activitySubject) {
      if (
        !activitySubject ||
        !activityNote ||
        !activityLocation ||
        !activityTime ||
        !activityDate ||
        !clueDecrypt ||
        !expertDecrypt
      )
        return res.status(400);

      try {
        //*>----------- create model for data  activity clue meet open
        await ActivityCluesMeetOpen.create({
          activitySubject: activitySubject,
          activityNote: activityNote,
          activityLocation: activityLocation,
          activityTime: activityTime,
          activityDate: activityDate,
          userId: expertDecrypt,
          clueId: clueDecrypt,
          clueName: clueName.fullName,
        });

        res.sendStatus(201);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
    } else if (activityTellSubject && activityTellNote) {
      if (
        !activityTellSubject ||
        !activityTellNote ||
        !activityTellTime ||
        !clueDecrypt ||
        !activityTellDate ||
        !expertDecrypt
      )
        return res.status(400);

      try {
        //*>----------- create model for data  activity clue tell open
        await ActivityCluesTellOpen.create({
          activityTellSubject: activityTellSubject,
          activityTellNote: activityTellNote,
          activityTellTime: activityTellTime,
          activityTellDate: activityTellDate,
          userId: expertDecrypt,
          clueId: clueDecrypt,
          clueName: clueName.fullName,
        });

        res.sendStatus(201);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
    }
  }
};

//*>----------- get route single and all clue

const getOneAndAllHandler = async (req, res) => {
  if (req.query.role && req.query.id) {
    const strId = req.query.id.toString();
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");
    const strIdNew = strId.replaceAll(" ", "+");

    if (!strIdNew && !strRoleNew) return res.sensStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    if (ROLES_LIST[1].role == decryptUserRole) {
      const clues = await Clues.find({})
      if (clues.length == 0)
        return res.status(404).json({
          status: 404,
          message: "سرنخی ثبت نشده است",
        });
      const encryptData = cerateCipher.encrypt(JSON.stringify(clues), Key);
      return res.status(202).json({ encryptData });
    }

    const userId = decryptUserId;

    const clues = await Clues.find({ expert: userId });

    if (clues) {
      if (!clues || clues.length == 0)
        return res.status(404).json({
          status: 404,
          message: "سرنخی ثبت نشده است",
        });

      const encryptData = cerateCipher.encrypt(JSON.stringify(clues), Key);

      return res.status(202).json({ encryptData });
    }
  }

  const strId = req.query.id.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

  const clue = await Clues.findOne({ _id: decryptUserId });

  const noteClue = await NoteClues.find({ clueId: decryptUserId });

  const activityCluesMeetOpen = await ActivityCluesMeetOpen.find({
    clueId: decryptUserId,
  });

  const activityCluesTellOpen = await ActivityCluesTellOpen.find({
    clueId: decryptUserId,
  });

  if (
    clue &&
    !req.query.idCamps &&
    !clue.campaign &&
    !noteClue &&
    !req.query.idCamps &&
    clue.campaign.length == 0 &&
    noteClue.length == 0
  ) {
    if (!clue || clue.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "سرنخی ثبت نشده است",
      });
    }
    const encryptData = cerateCipher.encrypt(JSON.stringify(clue), Key);
    return res.status(202).json({ encryptData });
  } else {
    if (
      noteClue.length == 0 &&
      activityCluesMeetOpen.length == 0 &&
      activityCluesTellOpen.length == 0 &&
      !req.query.idCamps &&
      !clue
    )
      return res.status(404).json({
        status: 404,
        message: "چیزی یافت نشد",
      });

    if (req.query.id && req.query.idCamps) {
      const strIdCamps = req.query.idCamps.toString();
      const strIdCampsNew = strIdCamps.replaceAll(" ", "+");
      const decryptStrIdCampsNew = JSON.parse(
        cerateCipher.decrypt(strIdCampsNew, Key)
      );

      //*>---------- start update clue and campaign

      //*>------------ search campaign in clue
      const result = clue.campaign.some((item) =>
        decryptStrIdCampsNew.includes(item)
      );

      if (result)
        return res.status(404).json({
          message: "رکورد مورد نظر تکراری میباشد",
          status: 404,
        });

      //*>---------- end search

      if (!result) {
        const updateClue = await Clues.findOneAndUpdate(
          {
            _id: decryptUserId,
          },
          {
            $push: { campaign: decryptStrIdCampsNew },
          }
        );

        // console.log(updateClue);

        await updateClue.save();
        for (let index = 0; index < decryptStrIdCampsNew.length; index++) {
          const updateCampaign = await CampaignMain.findOneAndUpdate(
            {
              _id: decryptStrIdCampsNew[index],
            },
            {
              $push: { clues: decryptUserId },
            }
          );

          await updateCampaign.save();
        }
        //*>---------- end update clue and campaign
        const campaignMain = await CampaignMain.find({
          _id: decryptStrIdCampsNew,
        });

        return res.sendStatus(201);
      }
    }

    const campaignMain = await CampaignMain.find({
      _id: clue.campaign || clue[0].campaign,
    });

    const encryptCampaignMain = cerateCipher.encrypt(
      JSON.stringify(campaignMain),
      Key
    );
    const encryptData = cerateCipher.encrypt(JSON.stringify(clue), Key);
    const encryptNoteClue = cerateCipher.encrypt(JSON.stringify(noteClue), Key);
    const encryptActivityCluesMeetOpen = cerateCipher.encrypt(
      JSON.stringify(activityCluesMeetOpen),
      Key
    );
    const encryptActivityCluesTellOpen = cerateCipher.encrypt(
      JSON.stringify(activityCluesTellOpen),
      Key
    );

    if (campaignMain.length == 0) {
      return res.status(202).json({
        status: 404,
        message: "کمپین موجود نمی باشد",
        encryptData,
        encryptNoteClue,
        encryptActivityCluesMeetOpen,
        encryptActivityCluesTellOpen,
      });
    }

    return res.status(202).json({
      encryptData,
      encryptNoteClue,
      encryptActivityCluesMeetOpen,
      encryptActivityCluesTellOpen,
      encryptCampaignMain,
    });
  }
};

//*>----------- put route one clue

const updateOneClue = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = cerateCipher.decrypt(strNew, Key);
  if (!decryptId) return res.sendStatus(404);

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  const {
    subject,
    fullName,
    role,
    mobile,
    qualityCustomer,
    callTime,
    industry,
    company,
    phonNumber,
    state,
    cities,
    address,
    noteSubject,
    noteBody,
    activitySubject,
    activityNote,
    activityLocation,
    activityTime,
    activityTellSubject,
    activityTellNote,
    activityTellTime,
    isActiveActivityNote,
    isActiveActivityTellNote,
    cancelationReason,
  } = dataDecrypt;
  if (subject && mobile) {
    if (
      !subject ||
      !fullName ||
      !role ||
      !mobile ||
      !qualityCustomer ||
      !callTime ||
      !industry ||
      !company ||
      !phonNumber ||
      !state ||
      !cities ||
      !address
    )
      return res.sendStatus(400);
    try {
      //*>----------- update model for data clue
      const updateClue = await Clues.findOneAndUpdate(
        { _id: decryptId },
        {
          subject,
          fullName,
          role,
          mobile,
          qualityCustomer,
          callTime,
          industry,
          company,
          phonNumber,
          state,
          cities,
          address,
        }
      );

      await updateClue.save();

      res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //*>---------- update note clue

  if (noteSubject && noteBody) {
    try {
      const updateNoteClue = await NoteClues.findOneAndUpdate(
        { _id: decryptId },
        {
          noteSubject: noteSubject,
          noteBody: noteBody,
        }
      );
      await updateNoteClue.save();

      return res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //*>---------- update activity meet clue
  if (activitySubject && activityNote) {
    try {
      const updateActivityCluesMeetOpen =
        await ActivityCluesMeetOpen.findOneAndUpdate(
          { _id: decryptId },
          {
            activitySubject: activitySubject,
            activityNote: activityNote,
            activityLocation: activityLocation,
            activityTime: activityTime,
          }
        );
      await updateActivityCluesMeetOpen.save();

      return res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //*>---------- update activity tell clue
  if (activityTellSubject && activityTellNote) {
    try {
      const updateActivityCluesTellOpen =
        await ActivityCluesTellOpen.findOneAndUpdate(
          { _id: decryptId },
          {
            activityTellSubject: activityTellSubject,
            activityTellNote: activityTellNote,
            activityTellTime: activityTellTime,
          }
        );
      await updateActivityCluesTellOpen.save();

      return res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //*>---------- update activity is active meet clue
  if (isActiveActivityNote && cancelationReason) {
    console.log(isActiveActivityNote, cancelationReason);
    try {
      const updateActivityCluesMeetOpen =
        await ActivityCluesMeetOpen.findOneAndUpdate(
          { _id: decryptId },
          {
            isActive: isActiveActivityNote,
            cancelationReason: cancelationReason,
          }
        );
      await updateActivityCluesMeetOpen.save();

      return res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //*>---------- update activity is active Tell clue
  if (isActiveActivityTellNote && cancelationReason) {
    try {
      const updateActivityCluesTellOpen =
        await ActivityCluesTellOpen.findOneAndUpdate(
          { _id: decryptId },
          {
            isActive: isActiveActivityTellNote,
            cancelationReason: cancelationReason,
          }
        );
      await updateActivityCluesTellOpen.save();

      return res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//*>----------- delete route one clue

const deleteOneClue = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = cerateCipher.decrypt(strNew, Key);
  const clue = await Clues.findOne({ _id: decryptId });
  const clueLength = clue.campaign;
  console.log(clueLength);

  try {
    //*>----------- delete model for data note clue
    await NoteClues.findOneAndDelete({ _id: decryptId });

    // >----------- delete model for data clue
    for (let index = 0; index < clueLength.length; index++) {
      const clueArray = await Clues.findOne({ _id: decryptId });
      await console.log("clue.campaign", clueArray.campaign);
      const deleteClueOfCampaign = await CampaignMain.findOneAndUpdate(
        { _id: clueArray.campaign[index] },
        { $pull: { clues: { $in: decryptId } } },
        { new: true }
      );

      await deleteClueOfCampaign.save();
    }

    await Clues.findOneAndDelete({ _id: decryptId });

    //*>----------- delete model for data  activity clues meet open
    await ActivityCluesMeetOpen.findOneAndDelete({ _id: decryptId });
    //*>----------- delete model for data  activity clues tell open
    await ActivityCluesTellOpen.findOneAndDelete({ _id: decryptId });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ export method

module.exports = {
  createHandler,
  getOneAndAllHandler,
  updateOneClue,
  deleteOneClue,
};
