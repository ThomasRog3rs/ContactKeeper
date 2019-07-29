//require express to use the router
const express = require('express');
const router = express.Router();

// @route      GET api/contacts
// @desc       Get logged in user's contacts
// @access     Private
router.get('/', (req, res) => {
  res.send("This will get logged in user's contacts");
});

// @route      POST api/contacts
// @desc       Add to logged in user's contacts
// @access     Private
router.post('/', (req, res) => {
  res.send("This will add to logged in user's contacts");
});

// @route      PUT api/contacts/:id
// @desc       Update logged in user's contacts
// @access     Private
router.put('/:id', (req, res) => {
  res.send("This will update logged in user's contacts");
});

// @route      DELETE api/contacts/:id
// @desc       Delete logged in user's contacts
// @access     Private
router.delete('/:id', (req, res) => {
  res.send("This will delete logged in user's contacts");
});

module.exports = router;
