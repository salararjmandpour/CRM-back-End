const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySaleOpenSchema = new Schema(
  {
    activitySubject: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    activityNote: {
      type: String,
      required: true,
      trim: true,
    },
    activityLocation: {
      type: String,
      required: true,
      trim: true,
    },
    activityParticipatingPeople: {
      type: String,
      require: true,
      trim: true,
    },
    activityPriority: {
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
    activityTime: {
      type: String,
      required: true,
      trim: true,
    },
    activityDate: {
      type: String,
      required: true,
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

module.exports = mongoose.model("ActivitySaleOpen", ActivitySaleOpenSchema);
