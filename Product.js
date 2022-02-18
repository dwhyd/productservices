const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "field harus ada"],
    minLength: 3,
    maxLength: 30,
  },
  harga: {
    type: Number,
    required: true,
    min: 1000,
    max: 999999999,
  },
  stok: {
    type: Number,
    min: 1,
    max: 999,
  },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
