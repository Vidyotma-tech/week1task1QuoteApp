const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/random', auth, async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error fetching quote');
  }
});

router.get('/search', auth, async (req, res) => {
  const { author } = req.query;
  try {
    const response = await axios.get(`https://api.quotable.io/quotes?author=${author}`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error fetching quotes');
  }
});

module.exports = router;