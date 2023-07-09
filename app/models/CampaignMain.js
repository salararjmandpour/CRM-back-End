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
      required: true,
      trim: true,
    },
    campaignTimeStart: {
      type: String,
      required: true,
      trim: true,
    },
    campaignTimeEnd: {
      type: String,
      required: true,
      trim: true,
    },
    campaignKind: {
      type: String,
      required: true,
      trim: true,
    },
    campaignNumberOfContacts: {
      type: Number,
      required: true,
      trim: true,
    },
    campaignResponse: {
      type: Number,
      required: true,
      trim: true,
    },
    campaignMoney: {
      type: Number,
      required: true,
      trim: true,
    },
    campaignIncome: {
      type: Number,
      required: true,
      trim: true,
    },
    campaignCost: {
      type: Number,
      required: true,
      trim: true,
    },
    campaignGoal: {
      type: String,
      required: true,
      trim: true,
    },
    campaignNote: {
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
