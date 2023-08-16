const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingMail = new Schema(
  {
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("SettingMail", settingMail);
