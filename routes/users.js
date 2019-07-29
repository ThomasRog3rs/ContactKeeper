//require express to use the router
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//get the model
const User = require('../models/User');

// @route      POST api/users
// @desc       Register a new user
// @access     Public
router.post(
  '/',
  [
    check('name', 'Name supply a name')
      .not()
      .isEmpty(),
    check('email', 'Please supply a valid email').isEmail(),
    check(
      'password',
      'Please supply a password with at least 6 chars'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('passed');
  }
);

module.exports = router;
// 'email',
// 'email is required and must be unique',
// 'password',
// 'password is required'
