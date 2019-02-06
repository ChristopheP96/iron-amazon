const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/products', (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.status(200);
      res.json(products);
    })
    .catch((error) => {

    });
});

router.post('/products', (req, res, next) => {
  const { name, price, imageURL } = req.body;
  Product.create({
    name,
    price,
    imageURL,
  }).then((productCreated) => {
    res.status(200);
    res.json({
      status: 'created',
      response: productCreated,
    });
  }).catch(() => {});
});

router.put('/products/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, price, imageURL } = req.body;
  Product.findByIdAndUpdate(id, {name, price, imageURL })
    .then((updatedProduct) => {
      res.status(200);
      res.json({
        status: 'updated',
        response: updatedProduct,
      });
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error,
      });
    });
});

router.delete('/products/:id', (req, res, next) => {
  // put your code here
  res.status(501);
  res.json({
    status: 'not implemented',
  });
});

module.exports = router;
