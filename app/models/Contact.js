const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
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
      unique: true,
      trim: true,
      minlength: 9,
      maxLength: 12,
    },
    state: {
      type: String,
      trim: true,
      minlength: 2,
      maxLength: 50,
    },
    cities: {
      type: String,
      trim: true,
      minlength: 2,
      maxLength: 50,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    atmCard: {
      type: Number,
      unique: true,
      trim: true,
      minlength: 16,
      maxLength: 20,
    },
    fax: {
      type: Number,
      unique: true,
      trim: true,
      minlength: 9,
      maxLength: 12,
    },
    birthDay: {
      type: String,
      trim: true,
      minlength: 9,
      maxLength: 12,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("contact", contactSchema);
