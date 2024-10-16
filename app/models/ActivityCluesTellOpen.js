const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityClueTellOpenSchema = new Schema(
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
    stepTell: {
      isActive: { type: Boolean, default: false },
      evaluation: { type: Boolean },
      PreliminaryNegotiations: { type: Boolean },
    },
    activityTellDate: {
      type: String,
      required: true,
      trim: true,
    },
    cancelationReason: {
      type: String,
      default: "",
      trim: true,
    },
    clueId: {
      type: String,
      required: true,
      trim: true,
    },
    clueName: {
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
  "ActivityClueTellOpen",
  ActivityClueTellOpenSchema
);
