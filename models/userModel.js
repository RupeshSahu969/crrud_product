const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Productdatalist', ProductSchema);
module.exports = {Product};
