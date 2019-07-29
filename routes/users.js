//require express to use the router
const express = require('express');
const router = express.Router();
//This is to hash the password
const bcrypt = require('bcryptjs');
//Json Web Token
const jwt = require('jsonwebtoken');
//config to get jwtSecret
const config = require('config');
//This is to validate the request
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({ msg: 'User is already registerd' });
      }

      user = new User({
        name: name,
        email: email,
        password: password
      });

      //hash password before sending to DB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      //Save in the DB
      await user.save();

      //Web Token to respond with
      const payload = {
        user: {
          id: user.id
        }
      };

      //create the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Something went wrong... Server Error');
    }
  }
);

module.exports = router;
