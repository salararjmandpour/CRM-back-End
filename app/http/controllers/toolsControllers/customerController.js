const Customer = require("app/models/Customer");

//*>---------- encrypt data sending

const cerateCipher = require("../../middleware/cerateCipher");
const Key = config.encryptionKey;

//*>---------- method of create customer

const createCustomer = async (req, res) => {
  const data = await req.body.data;

  if (!data.firstName && !data.lastName && !data.mobile) {
    return res.status(400);
  }

  const { firstName, lastName, mobile, comment, job, subject } = data;

  try {

    await Customer.create({
      firstName,
      lastName,
      mobile,
      comment,
      job,
      subject,
    });

    res.sendStatus(201);
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
};


const getCustomer = async(req,res)=>{

  try {

    const findCustomer = await Customer.find({});

    return res.status(202).json({ findCustomer });
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err });
  }
}

module.exports = { createCustomer,getCustomer };
