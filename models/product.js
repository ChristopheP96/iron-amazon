const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const productSchema = new Schema({
  name: String,
  price: String,
  imageURL: String,
  reviews: [{
    type: ObjectId,
    ref: 'Review',
  }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
