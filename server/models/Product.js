const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  price: Number,
  salePrice: Number,
  brand: String,
  totalStock: Number
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
