const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    industry: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 25,
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
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("account", accountSchema);
