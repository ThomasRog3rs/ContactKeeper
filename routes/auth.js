//require express to use the router
const express = require('express');
const router = express.Router();

// @route      GET api/auth
// @desc       Get logged in user
// @access     Private
router.get('/', (req, res) => {
  res.send('This will get logged in user');
});

// @route      POST api/auth
// @desc       Login the user
// @access     Public
router.post('/', (req, res) => {
  res.send('This will login the user');
});

module.exports = router;
