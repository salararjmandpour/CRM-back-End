const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignMainSchema = new Schema(
  {
    campaignName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    campaignStatus: {
      type: String,
      required: false,
      trim: true,
    },
    campaignTimeStart: {
      type: String,
      required: false,
      trim: true,
    },
    campaignTimeEnd: {
      type: String,
      required: false,
      trim: true,
    },
    campaignKind: {
      type: String,
      required: false,
      trim: true,
    },
    campaignNumberOfContacts: {
      type: Number,
      required: false,
      trim: true,
    },
    campaignResponse: {
      type: Number,
      required: false,
      trim: true,
    },
    campaignMoney: {
      type: Number,
      required: false,
      trim: true,
    },
    campaignIncome: {
      type: Number,
      required: false,
      trim: true,
    },
    campaignCost: {
      type: Number,
      required: false,
      trim: true,
    },
    campaignGoal: {
      type: String,
      required: false,
      trim: true,
    },
    campaignNote: {
      type: String,
      required: false,
      trim: true,
    },
    userFullName: {
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

module.exports = mongoose.model("CampaignMain", CampaignMainSchema);
