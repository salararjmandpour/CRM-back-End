const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    numberOfInvoice: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nameOfInvoice: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    statusInvoice: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    nameOfAgent: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    economicCode: {
      type: Number,
      required: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    wayOfPost: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    wayOfPay: {
      type: String,
      required: true,
      trim: true,
    },
    addressOfProduct: {
      type: String,
      required: true,
      trim: true,
    },
    addressOfInvoice: {
      type: String,
      required: true,
      trim: true,
    },
    sumTax: {
      type: Number,
      required: true,
      trim: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    expert: {
      type: String,
      required: true,
      trim: true,
    },
    sale: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// clueSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("invoice", invoiceSchema);
