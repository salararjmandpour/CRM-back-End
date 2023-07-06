const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityClueOpenSchema = new Schema(
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
    activityTime: {
      type: String,
      required: true,
      trim: true,
    },
    clueId: {
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

module.exports = mongoose.model("ActivityClueOpen", ActivityClueOpenSchema);
