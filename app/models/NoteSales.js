const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSalesSchema = new Schema(
  {
    noteSubject: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    noteBody: {
      type: String,
      required: true,
      trim: true,
    },
    saleId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("NoteSales", NoteSalesSchema);
