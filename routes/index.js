const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const bcryptSalt = 10;

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup', { errorMessage: undefined });
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('auth/signup', { errorMessage: 'empty fields' });
  } else {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          User.create({ username, password: hashPass })
            .then(() => {
              res.redirect('/products');
            })
            .catch((error) => {
              next(error);
            });
        } else {
          res.render('auth/signup', { errorMessage: 'incorrect' });
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

module.exports = router;


