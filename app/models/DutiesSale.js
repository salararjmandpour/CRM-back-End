const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DutiesSaleSchema = new Schema(
  {
    subjectForDuties: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    explainForDuties: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    dateForDuties: {
      type: String,
      required: true,
      trim: true,
    },
    timeForDuties: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      isActive: { type: Boolean, default: false },
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

module.exports = mongoose.model("dutiesSale", DutiesSaleSchema);
