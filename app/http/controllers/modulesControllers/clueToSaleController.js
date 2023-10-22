const Clues = require("app/models/Clue");
const Sale = require("app/models/Sale");
const Invoice = require("app/models/Invoice");
const ActivitySaleMeetOpen = require("app/models/ActivitySaleMeetOpen");
const NoteSales = require("app/models/NoteSales");
const ActivitySaleTellOpen = require("app/models/ActivitySaleTellOpen");
const DutiesSale = require("app/models/DutiesSale");
const InquiryOfPrice = require("app/models/InquiryOfPrice");
const ROLES_LIST = require("app/config/roles_list");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>----------- post route Contact

const createHandlerNew = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEncSale, Key)
  );
  const userId = cerateCipher.decrypt(dataDecrypt.userId, Key);

  if (!dataDecrypt) return res.sendStatus(404);

  const clue = await Clues.findOne({ _id: dataDecrypt.id });

  const {
    subject,
    fullName,
    role,
    mobile,
    industry,
    company,
    phonNumber,
    qualityCustomer,
    campaign,
  } = clue;

  try {
    //*>----------- create model for data sale
    await Sale.create({
      subject,
      fullName,
      role,
      mobile,
      expert: {
        expertId: userId,
        expertFullName: clue.expertFullName,
      },
      qualityCustomer,
      dateForSale: dataDecrypt.dateForSale,
      industry,
      company,
      campaign,
      phoneNumber: phonNumber,
      address: {
        address: clue.address,
        state: clue.state,
        cities: clue.cities,
      },
    });

    res.sendStatus(202);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};

//*>---------- create method activity for sale by user id

const createHandlerActivity = async (req, res) => {
  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );
  const saleDecrypt = await cerateCipher.decrypt(req.body.getId.saleId, Key);
  const expertDecrypt = await cerateCipher.decrypt(req.body.getId.userId, Key);

  const saleName = await Sale.findOne({ _id: saleDecrypt });

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
    subjectForDuties,
    explainForDuties,
    dateForDuties,
    timeForDuties,
  } = dataDecrypt;

  const stepMeet = dataDecrypt.stepMeet;
  const stepTell = dataDecrypt.stepTell;
  const status = dataDecrypt.state;

  if (noteSubject) {
    if (!noteSubject || !dataDecrypt || !saleDecrypt || !expertDecrypt)
      return res.status(400);

    try {
      //*>----------- create model for data  note clue
      await NoteSales.create({
        noteSubject: noteSubject,
        noteBody: noteBody,
        userId: expertDecrypt,
        saleId: saleDecrypt,
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
      !saleDecrypt ||
      !expertDecrypt
    )
      return res.status(400);

    try {
      //*>----------- create model for data  activity sale meet open
      await ActivitySaleMeetOpen.create({
        activitySubject: activitySubject,
        activityNote: activityNote,
        activityLocation: activityLocation,
        activityTime: activityTime,
        activityDate: activityDate,
        userId: expertDecrypt,
        stepMeet: stepMeet,
        saleId: saleDecrypt,
        saleName: saleName.fullName,
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
      !saleDecrypt ||
      !activityTellDate ||
      !expertDecrypt
    )
      return res.status(400);

    try {
      //*>----------- create model for data  activity sale tell open
      await ActivitySaleTellOpen.create({
        activityTellSubject: activityTellSubject,
        activityTellNote: activityTellNote,
        activityTellTime: activityTellTime,
        activityTellDate: activityTellDate,
        userId: expertDecrypt,
        stepTell: stepTell,
        saleId: saleDecrypt,
        saleName: saleName.fullName,
      });

      res.sendStatus(201);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  } else if (subjectForDuties) {
    if (
      !subjectForDuties ||
      !explainForDuties ||
      !dateForDuties ||
      !timeForDuties
    )
      return res.status(400);

    try {
      //*>----------- create model for data  activity sale Duties
      await DutiesSale.create({
        subjectForDuties,
        explainForDuties,
        dateForDuties,
        timeForDuties,
        status,
        userId: expertDecrypt,
        saleId: saleDecrypt,
      });

      res.sendStatus(201);
    } catch (error) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//*>---------- get method activity by sale id

const getHandlerActivity = async (req, res) => {
  const strSaleId = req.query.saleId.toString();
  const strSaleIdNew = strSaleId.replaceAll(" ", "+");

  if (!strSaleIdNew) return res.sensStatus(404);

  const decryptSaleId = cerateCipher.decrypt(strSaleIdNew, Key);

  //!>----------- get model Activity data all by sale id

  try {
    //*>--------- try find data

    const noteSales = await NoteSales.find({ saleId: decryptSaleId });
    const activitySaleMeetOpen = await ActivitySaleMeetOpen.find({
      saleId: decryptSaleId,
    });
    const activitySaleTellOpen = await ActivitySaleTellOpen.find({
      saleId: decryptSaleId,
    });
    const dutiesSale = await DutiesSale.find({
      saleId: decryptSaleId,
    });

    //*>---------- encrypt find data

    const encryptNoteSales = cerateCipher.encrypt(
      JSON.stringify(noteSales),
      Key
    );
    const encryptActivitySaleMeetOpen = cerateCipher.encrypt(
      JSON.stringify(activitySaleMeetOpen),
      Key
    );
    const encryptActivitySaleTellOpen = cerateCipher.encrypt(
      JSON.stringify(activitySaleTellOpen),
      Key
    );
    const encryptDutiesSale = cerateCipher.encrypt(
      JSON.stringify(dutiesSale),
      Key
    );

    return res.status(202).json({
      encryptNoteSales,
      encryptActivitySaleMeetOpen,
      encryptActivitySaleTellOpen,
      encryptDutiesSale,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "چیزی یافت نشد",
    });
  }
};

//*>---------- get method all sale by user

const getByUserHandler = async (req, res) => {
  if (req.query.role && req.query.id) {
    const strId = req.query.id.toString();
    const strIdNew = strId.replaceAll(" ", "+");
    const strRole = req.query.role.toString();
    const strRoleNew = strRole.replaceAll(" ", "+");

    if (!strIdNew && !strRoleNew) return res.sensStatus(404);

    const decryptUserRole = cerateCipher.decrypt(strRoleNew, Key);
    const decryptUserId = cerateCipher.decrypt(strIdNew, Key);

    //!>----------- get all  model for data  by role seniorManager

    if (ROLES_LIST.SeniorManager == decryptUserRole) {
      try {
        const saleAll = await Sale.find({});
        if (saleAll.length == 0)
          return res.status(404).json({
            status: 404,
            message: "فروشی ثبت نشده است",
          });
        const encryptData = cerateCipher.encrypt(JSON.stringify(saleAll), Key);
        return res.status(202).json({ encryptData });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      }
    } else {
      try {
        //!>----------- get all  model for data user
        const saleAll = await Sale.find({ "expert.expertId": decryptUserId });

        if (!saleAll || saleAll.length == 0) {
          return res.status(404).json({
            status: 404,
            message: "فروشی ثبت نشده است",
          });
        }
        const encryptData = cerateCipher.encrypt(JSON.stringify(saleAll), Key);
        return res.status(202).json({ encryptData });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      }
    }
  }

  //*>---------- get method  single sale by id sale

  if (req.query.saleId) {
    const strId = req.query.saleId.toString();
    const strIdNew = strId.replaceAll(" ", "+");
    const decryptSaleId = cerateCipher.decrypt(strIdNew, Key);

    try {
      const sale = await Sale.findOne({ _id: decryptSaleId });
      if (!sale || sale.length == 0) {
        return res.status(404).json({
          status: 404,
          message: "فروشی ثبت نشده است",
        });
      }
      const encryptData = cerateCipher.encrypt(JSON.stringify(sale), Key);
      return res.status(202).json({ encryptData });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err.message });
    }
  }
};

//*>---------- update method all sale by id

const updateSaleById = async (req, res) => {
  const str = req.query.id.toString();
  const strNew = str.replaceAll(" ", "+");
  const decryptId = cerateCipher.decrypt(strNew, Key);

  const dataDecrypt = await JSON.parse(
    cerateCipher.decrypt(req.body.dataEnc, Key)
  );

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
    subjectForDuties,
    explainForDuties,
    dateForDuties,
    timeForDuties,
    cancelationReason,
  } = dataDecrypt;

  const stepMeet = dataDecrypt.stepMeet;
  const stepTell = dataDecrypt.stepTell;
  const status = dataDecrypt.status;

  if (subjectForDuties) {
    if (
      !subjectForDuties ||
      !explainForDuties ||
      !dateForDuties ||
      !timeForDuties
    )
      return res.status(400);

    //*>----------- update model for data  activity sale Duties
    try {
      const updateDutiesSale = await DutiesSale.findOneAndUpdate(
        { _id: decryptId },
        {
          subjectForDuties,
          explainForDuties,
          dateForDuties,
          timeForDuties,
        }
      );

      await updateDutiesSale.save();

      res.sendStatus(200);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }

  //!>---------- update status model of duties by id
  else if (cancelationReason) {
    try {
      const updateStatusDutiesSale = await DutiesSale.findOneAndUpdate(
        { _id: decryptId },
        {
          cancelationReason,
          status,
        }
      );
      await updateStatusDutiesSale.save();

      res.sendStatus(200);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: err });
    }
  }
};

//*>---------- delete method all sale by id

const deleteSaleById = async (req, res) => {
  const strId = req.query.id.toString();
  const strIdNew = strId.replaceAll(" ", "+");
  const decryptId = cerateCipher.decrypt(strIdNew, Key);

  console.log(decryptId);

  try {
    await DutiesSale.findOneAndDelete({
      $or: [{ _id: decryptId }, { saleId: decryptId }],
    });
    await NoteSales.findOneAndDelete({
      $or: [{ _id: decryptId }, { saleId: decryptId }],
    });
    await Sale.findOneAndDelete({ _id: decryptId });
    await Invoice.findOneAndDelete({ sale: decryptId });
    await InquiryOfPrice.findOneAndDelete({ sale: decryptId });
    return res.status(200).json({ status: 200, message: "با موفقعیت پاک شد" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

//*>------------ export method

module.exports = {
  createHandlerNew,
  getByUserHandler,
  deleteSaleById,
  createHandlerActivity,
  getHandlerActivity,
  updateSaleById,
};
