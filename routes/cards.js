const express = require('express');
const router = express.Router();
const { data } = require('./data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  // here we pass in an object with the property "prompt", set to a question we want to ask. 
  // res.render('card', { prompt: "Who is buried in Grants Tomb?" });

  // We change our code from above to this. We connect the template to the first question. In the obeject we are passing in to the template, we point the "prompt" property to the first cards questions property. Also hint to the cards hint. 
  res.render('card', {
    prompt: cards[req.params.id].question,
    hint: cards[req.params.id].hint
  });
});

module.exports = router;