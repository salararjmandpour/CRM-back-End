const User = require("app/models/User");
const Clues = require("app/models/Clue");
const Contact = require("app/models/Contact");
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

    const duplicate = await Clues.findOne({
      $or: [{ mobile }, { phonNumber }],
    });
    if (duplicate) {
      return res.status(409).json({
        message: "شماره موبایل یا شماره ثابت تکراری می باشد لطفا بررسی کنید ):",
      });
    }

    //*>----------- create model for data clue
    try {
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

    const stepMeet = dataDecrypt.stepMeet;
    const stepTell = dataDecrypt.stepTell;

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
          stepMeet: stepMeet,
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
          stepTell: stepTell,
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

    if (!strIdNew && !strRoleNew) return res.sendStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    if (
      ROLES_LIST.SeniorManager == decryptUserRole ||
      ROLES_LIST.SalesManager == decryptUserRole ||
      ROLES_LIST.CRMManager == decryptUserRole
    ) {
      const clues = await Clues.find({});
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

  console.log(decryptUserId);

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

  //*>---------- clue update not position

  if (!dataDecrypt.position) {
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
      cancelationReason,
    } = dataDecrypt;

    const stepMeet = dataDecrypt.stepMeet;
    const stepTell = dataDecrypt.stepTell;

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

    if (noteSubject && noteBody) {
      //*>---------- update note clue

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
    if (stepMeet && cancelationReason) {
      try {
        const updateActivityCluesMeetOpen =
          await ActivityCluesMeetOpen.findOneAndUpdate(
            { _id: decryptId },
            {
              stepMeet: stepMeet,
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
    if (stepTell && cancelationReason) {
      try {
        const updateActivityCluesTellOpen =
          await ActivityCluesTellOpen.findOneAndUpdate(
            { _id: decryptId },
            {
              stepTell: stepTell,
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
  }

  //*>---------- clue update but position

  if (dataDecrypt.position) {
    try {
      //*>----------- update model for data clue
      const updateClue = await Clues.findOneAndUpdate(
        { _id: decryptId },
        {
          subject: dataDecrypt.subject,
          position: dataDecrypt.position,
        }
      );

      await updateClue.save();

      res.sendStatus(202);
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
  let clueLength;

  try {
    //*>----------- delete model for data note clue
    await NoteClues.findOneAndDelete({ _id: decryptId });

    // >----------- delete model for data clue
    if (clue) {
      clueLength = clue.campaign;
      for (let index = 0; index < clueLength.length; index++) {
        const clueArray = await Clues.findOne({ _id: decryptId });
        const deleteClueOfCampaign = await CampaignMain.findOneAndUpdate(
          { _id: clueArray.campaign[index] },
          { $pull: { clues: { $in: decryptId } } },
          { new: true }
        );

        await deleteClueOfCampaign.save();
      }

      const checkContact = await Contact.findOne({ mobile: clue.mobile });
      if (checkContact) {
        const mobileContact = await Contact.findOneAndUpdate(
          { mobile: clue.mobile },
          { isActive: true }
        );
        await mobileContact.save();
      }
    }

    await Clues.findOneAndDelete({ _id: decryptId });

    //*>----------- delete model for data activity clue note
    await NoteClues.findOneAndDelete({ clueId: decryptId });
    //*>----------- delete model for data  activity clues meet open
    await ActivityCluesMeetOpen.findOneAndDelete({ clueId: decryptId });
    //*>----------- delete model for data  activity clues tell open
    await ActivityCluesTellOpen.findOneAndDelete({ clueId: decryptId });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>------------ delete a campaign of a clue

const deleteCampaignOfClue = async (req, res) => {
  const strClueId = req.query.clueId.toString();
  const strNewClueId = strClueId.replaceAll(" ", "+");
  const decryptClueId = cerateCipher.decrypt(strNewClueId, Key);

  const strCampaignId = req.query.campaignId.toString();
  const strNewCampaignId = strCampaignId.replaceAll(" ", "+");
  const decryptCampaignId = cerateCipher.decrypt(strNewCampaignId, Key);

  try {
    const deleteCampaignOfClues = await Clues.findOneAndUpdate(
      { _id: decryptClueId },
      { $pull: { campaign: { $in: decryptCampaignId } } },
      { new: true }
    );

    const deleteClueOfCampaign = await CampaignMain.findOneAndUpdate(
      { _id: decryptCampaignId },
      { $pull: { clues: { $in: decryptClueId } } },
      { new: true }
    );

    await deleteCampaignOfClues.save();
    await deleteClueOfCampaign.save();
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
  deleteCampaignOfClue,
};
