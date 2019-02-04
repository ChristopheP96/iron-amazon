const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: String,
  imageURL: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
