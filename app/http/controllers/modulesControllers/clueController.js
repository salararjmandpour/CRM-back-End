const User = require("app/models/User");
const Clues = require("app/models/Clue");
const NoteClues = require("app/models/NoteClues");
const ActivityCluesMeetOpen = require("app/models/ActivityCluesMeetOpen");
const ROLES_LIST = require("app/config/roles_list");

//>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//>----------- post route clue

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
      webSite,
      industry,
      company,
      phonNumber,
      email,
      address,
      numberOfStaff,
    } = dataDecrypt;

    if (
      !subject ||
      !fullName ||
      !role ||
      !mobile ||
      !webSite ||
      !industry ||
      !expertDecrypt ||
      !expertFullName ||
      !company ||
      !phonNumber ||
      !email ||
      !address ||
      !numberOfStaff
    ) {
      return res.status(400);
    }

    const duplicate = await Clues.findOne({ mobile, phonNumber, email }).exec();

    if (duplicate) return res.status(409);

    try {
      //>----------- create model for data clue

      await Clues.create({
        subject: subject,
        fullName: fullName,
        role: role,
        mobile: mobile,
        webSite: webSite,
        industry: industry,
        expert: expertDecrypt,
        expertFullName: expertFullName,
        company: company,
        phonNumber: phonNumber,
        email: email,
        address: address,
        numberOfStaff: numberOfStaff,
      });

      res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //>------------- handel create note clue by user

  if (req.body.getId.clueId && req.body.getId.userId) {
    const clueDecrypt = await cerateCipher.decrypt(req.body.getId.clueId, Key);
    const expertDecrypt = await cerateCipher.decrypt(
      req.body.getId.userId,
      Key
    );

    const {
      noteSubject,
      noteBody,
      activitySubject,
      activityNote,
      activityLocation,
      activityTime,
    } = dataDecrypt;

    if (noteSubject) {
      if (!noteSubject || !dataDecrypt || !clueDecrypt || !expertDecrypt)
        return res.status(400);

      try {
        //>----------- create model for data  note clue
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
        !clueDecrypt ||
        !expertDecrypt
      )
        return res.status(400);

      try {
        //>----------- create model for data  activity clue meet open
        await ActivityCluesMeetOpen.create({
          activitySubject: activitySubject,
          activityNote: activityNote,
          activityLocation: activityLocation,
          activityTime: activityTime,
          userId: expertDecrypt,
          clueId: clueDecrypt,
        });

        res.sendStatus(201);
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err });
      }
    }
  }
};

//>----------- get route single an d all clue

const getOneAndAllHandler = async (req, res) => {
  if (req.query.role && req.query.id) {
    const strId = req.query.id.toString();
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");
    const strIdNew = strId.replaceAll(" ", "+");

    if (!strIdNew && !strRoleNew) return res.sensStatus(304);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    if (ROLES_LIST[1].role == decryptUserRole) {
      const clues = await Clues.find({});
      if (clues.length == 0) return res.status(304).send("سرنخی ثبت نشده است");
      const encryptData = cerateCipher.encrypt(JSON.stringify(clues), Key);
      return res.status(202).json({ encryptData });
    }

    const userId = decryptUserId;

    const clues = await Clues.find({ expert: userId });

    if (clues) {
      if (!clues || clues.length == 0)
        return res.status(304).send("سرنخی ثبت نشده است");

      const encryptData = cerateCipher.encrypt(JSON.stringify(clues), Key);

      return res.status(202).json({ encryptData });
    }
  }

  const strId = req.query.id.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

  const clue = await Clues.findOne({ _id: decryptUserId });

  const noteClue = await NoteClues.find({ clueId: decryptUserId });

  if ((clue && noteClue.length == 0) || !noteClue) {
    if (!clue || clue.length == 0) {
      return res.status(304).send("سرنخی ثبت نشده است");
    }
    const encryptData = cerateCipher.encrypt(JSON.stringify(clue), Key);
    return res.status(202).json({ encryptData });
  } else {
    if (noteClue.length == 0) return res.status(304).send("یاداشت یافت نشد");
    const encryptData = cerateCipher.encrypt(JSON.stringify(clue), Key);
    const encryptNoteClue = cerateCipher.encrypt(JSON.stringify(noteClue), Key);
    return res.status(202).json({ encryptData, encryptNoteClue });
  }
};

//>----------- put route one clue

const updateOneClue = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = cerateCipher.decrypt(strNew, Key);

  if (!decryptId) return res.sendStatus(304);

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

  const {
    subject,
    fullName,
    mobile,
    company,
    email,
    address,
    noteSubject,
    noteBody,
  } = dataDecrypt;

  if (subject && mobile) {
    if (!subject || !fullName || !mobile || !company || !email || !address)
      return res.sendStatus(400);
    try {
      //>----------- update model for data clue
      const updateClue = await Clues.findOneAndUpdate(
        { _id: decryptId },
        {
          subject: subject,
          fullName: fullName,
          mobile: mobile,
          company: company,
          email: email,
          address: address,
        }
      );

      await updateClue.save();

      res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //>---------- update note clue
  else {
    try {
      const updateNoteClue = await NoteClues.findOneAndUpdate(
        { _id: decryptId },
        {
          noteSubject: noteSubject,
          noteBody: noteBody,
        }
      );
      await updateNoteClue.save();

      res.sendStatus(202);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//>----------- delete route one clue

const deleteOneClue = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");

  const decryptId = cerateCipher.decrypt(strNew, Key);

  try {
    //>----------- delete model for data note clue
    await NoteClues.findOneAndDelete({ _id: decryptId });
    //>----------- delete model for data clue
    await Clues.findOneAndDelete({ _id: decryptId });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//>------------ export method

module.exports = {
  createHandler,
  getOneAndAllHandler,
  updateOneClue,
  deleteOneClue,
};
