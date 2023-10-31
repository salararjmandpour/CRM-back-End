const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const medicalStorageSchema = new Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxLength: 100,
    },
    inventory: {
      amount: { type: Number, required: true, trim: true },
      unit: {
        type: String,
        required: true,
        trim: true,
      },
    },
    expert: {
      type: String,
      required: true,
      trim: true,
    },
    expirationDate: {
      type: String,
      required: true,
      trim: true,
    },
    IRC: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// clueSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("medicalStorage", medicalStorageSchema);
