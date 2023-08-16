const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const panelSms = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    uname: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("PanelSms", panelSms);
