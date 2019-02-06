const express = require('express');
const Product = require('../models/product');
const Review = require('../models/review');

const router = express.Router();

// async await

/* GET products listing. */
router.get('/', async (req, res, next) => {
  console.log('branch async');
  try {
    const products = await Product.find({});
    res.render('products/products', { products });
  } catch (error) {
    next(error);
  }
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
    .populate('reviews')
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
      next(error);
    });
});

router.post('/:id/review', async (req, res, next) => {
  const { id } = req.params; // product id
  const { content, stars, author } = req.body; // review object

  const review = new Review({
    content,
    author,
    stars,
  });
  try {
    await review.save();
    await Product.findByIdAndUpdate(id, { $push: { reviews: review.id } });
    res.redirect(`/products/${id}`);
  } catch (error) {
    next(error);
  }
  // review.save()
  //   .then(() => Product.findByIdAndUpdate(id, { $push: { reviews: review.id } }))
  //   .then(() => {
  //     res.redirect(`/products/${id}`);
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });
});

module.exports = router;
