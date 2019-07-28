//require express to use the router
const express = require('express');
const router = express.Router();

// @route      POST api/users
// @desc       Register a new user
// @access     Public
router.post('/', (req, res) => {
  res.send('This will register a user');
});

module.exports = router;
