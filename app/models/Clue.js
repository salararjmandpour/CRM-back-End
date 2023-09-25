const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
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
    position: {
      clue: { type: Boolean, default: true },
      sale: { type: Boolean, default: false },
    },
    phonNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      minlength: 9,
      maxLength: 12,
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
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 500,
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

clueSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("clue", clueSchema);
