const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuckingPwd = new Schema({
  username: {
    type: Number, 
    required: true,
    unique: true,
    trim: true,
    minLength: 9,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  
},
  { timestamps: true, toJSON: { virtuals: true } });

module.exports = mongoose.model("FuckingPwd", fuckingPwd);
