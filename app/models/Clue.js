const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clueSchema = new Schema(
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
      type: String,
      required: true,
      trim: true,
    },
    expertFullName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
      default: null,
    },
    phonNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      minlength: 9,
      maxLength: 12,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    qualityCustomer: {
      type: String,
      required: true,
      trim: true,
    },
    callTime: {
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

module.exports = mongoose.model("clue", clueSchema);
