const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const InquiryOfPriceSchema = new Schema(
  {
    numberOfInquiryOfPrice: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxLength: 100,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    date: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    customerNumber: {
      type: Number,
      required: true,
      // trim: true,
      // unique: true,
      minlength: 10,
      maxLength: 12,
    },
    questionOfPrice: [Object],
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


module.exports = mongoose.model("inquiryOfPrice", InquiryOfPriceSchema);
