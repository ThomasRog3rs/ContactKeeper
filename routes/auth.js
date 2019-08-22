//require express to use the router
const express = require('express');
const router = express.Router();
//This is to hash the password
const bcrypt = require('bcryptjs');
//Json Web Token
const jwt = require('jsonwebtoken');
//config to get jwtSecret
const config = require('config');
//Get middleware
const auth = require('../middleware/auth');
//This is to validate the request
const { check, validationResult } = require('express-validator/check');

//get the model
const User = require('../models/User');

// @route      GET api/auth
// @desc       Get logged in user
// @access     Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route      POST api/auth
// @desc       Login the user
// @access     Public
router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

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
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
