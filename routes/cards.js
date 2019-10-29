const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  // here we pass in an object with the property "prompt", set to a question we want to ask. 
  res.render('card', { prompt: "Who is buried in Grants Tomb?" });
});

module.exports = router;