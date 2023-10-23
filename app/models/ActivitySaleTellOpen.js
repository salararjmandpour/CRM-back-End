const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySaleTellOpenSchema = new Schema(
  {
    activityTellSubject: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    activityTellNote: {
      type: String,
      required: true,
      trim: true,
    },
    activityTellTime: {
      type: String,
      required: true,
      trim: true,
    },
    activityTellDate: {
      type: String,
      required: true,
      trim: true,
    },
    activityCallType: {
      type: String,
      require: true,
      trim: true,
    },
    activityCallPriority: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      isActive: { type: Boolean, default: false },
      successful: { type: Boolean },
      Unsuccessful: { type: Boolean },
    },
    cancelationReason: {
      type: String,
      default: "",
      trim: true,
    },
    saleId: {
      type: String,
      required: true,
      trim: true,
    },
    saleName: {
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

module.exports = mongoose.model(
  "ActivitySaleTellOpen",
  ActivitySaleTellOpenSchema
);
