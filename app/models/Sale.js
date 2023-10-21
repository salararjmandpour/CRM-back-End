const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
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
    role: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
      maxLength: 12,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 25,
    },
    expert: {
      expertId: { type: String, required: true, trim: true },
      expertFullName: { type: String, required: true, trim: true },
    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
      default: null,
    },
    step: {
      invoice: { type: String, default: "60%" },
      finalNegotiations: { type: String },
      closed: { type: String },
    },
    totalAmount: {
      type: Number,
      default: 0,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      minlength: 9,
      maxLength: 12,
    },
    address: {
      address: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxLength: 300,
      },
      state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxLength: 50,
      },
      cities: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxLength: 50,
      },
    },
    qualityCustomer: {
      type: String,
      required: true,
      trim: true,
    },
    dateForSale: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    campaign: [String],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// clueSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("sale", saleSchema);
