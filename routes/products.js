const express = require('express');
const Product = require('../models/product');

const router = express.Router();

/* GET products listing. */
router.get('/', (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.render('products/products', { products });
    })
    .catch(next);
});

router.get('/new', (req, res, next) => {
  res.render('products/new');
});

router.post('/', (req, res, next) => {
  const { name, price, imageURL } = req.body;
  // const name = req.body.name;
  // const price = req.body.price;
  // const imageURL = req.body.imageURL;
  Product.create({ name, price, imageURL })
    .then((result) => {
      res.redirect('/products');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      res.render('products/detail', { product });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((product) => {
      res.redirect('/products');
    })
    .catch((error) => {
      next(error)
    })
});

module.exports = router;
