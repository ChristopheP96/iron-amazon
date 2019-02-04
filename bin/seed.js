const mongoose = require('mongoose');
const Product = require('../models/product');

const products = [
  { name: 'Macbook Pro', price: '5', imageURL: '' },
  { name: 'Macbook Air', price: '2', imageURL: '' },
];

mongoose.connect('mongodb://localhost:27017/iron-amazon', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db');
    return Product.create(products);
  }).then((data) => {
    console.log('created data', data);
  }).then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
    mongoose.connection.close();
  });
