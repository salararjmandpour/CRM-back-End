const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxLength: 25,
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
    User: { type: Number, default: 1000 },
    Editor: Number,
    Admin: Number,
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
  refreshToken: [String],
});

module.exports = mongoose.model("User", userSchema);
