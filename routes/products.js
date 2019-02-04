const express = require('express');
const Product = require('../models/product');

const router = express.Router();

/* GET products listing. */
router.get('/', (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.render('products/products', { products: products });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
