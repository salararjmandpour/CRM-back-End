const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxLength: 100,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
      maxLength: 12,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => {
          if (!validator.isEmail(email)) {
            throw new Error(chalk.red("email format is not Correct :("));
          }
          return true;
        },
      },
    },
    username: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      minLength: 9,
      maxLength: 15,
    },
    roles: {
      User: Number,
      SeniorManager: Number,
      Assistant: Number,
      LogisticsManager: Number,
      LogisticsSpecialist: Number,
      ContentManager: Number,
      SalesManager: Number,
      SalesSpecialist: Number,
      FinanceManager: Number,
      AccountingManager: Number,
      AccountingAssistant: Number,
      Accountant: Number,
      CRMSpecialist: Number,
      CRMManager: Number,
      BusinessManager: Number,
      BusinessSpecialist: Number,
      WarehouseManager: Number,
      WarehouseSpecialist: Number,
      HrManager: Number,
      HrSpecialist: Number,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdOn: {
      type: String,
      required: true,
    },
    accessLevel: {
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      insert: { type: Boolean, default: false },
      fullAccess: { type: Boolean, default: false },
    },
    recruitment:{type:Boolean,default:false},
    refreshToken: [String],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("User", userSchema);
