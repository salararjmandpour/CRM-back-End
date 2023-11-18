const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    job: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Customer", customerSchema);
