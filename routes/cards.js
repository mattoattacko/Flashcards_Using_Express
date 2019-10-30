const express = require('express');
const router = express.Router();
const { data } = require('./data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  // Here we check for the presence of a query string key side. Assigned to var "side".
  const { side } = req.query;
  // Since "question" and "answer" are properties on the json, we can use the value stored in "side" to find the text we want to display.
  // We need the id of the card. We create a variable to hold the id from the route paramater. 
  const { id } = req.params;
  // Now we can access the two pieces of text that we want to use. We store it in a constant named "text".
  const text = cards[id][side];
  // We also want to store a reference to the hint. 
  const { hint } = cards[id];

  // Now we route the text and the hint into an object that we can pass into the template. "{ text, hint }"
  // In order to show the hint only on the question side of the card, we will remove it from where the templateData variable is declared. 
  const templateData = { text };

  // To only display the hint on question side, we add an if statement, setting the hint property to equal "hint" when the "side" is holding the 'question' string. 
  if (side === 'question') {
    templateData.hint = hint;
  }
  res.render('card', templateData)
});




  // Lastly, we need to change the variable name in the card template from "card" to "text". This will ensure the question or answer will show up. 

  // here we pass in an object with the property "prompt", set to a question we want to ask. 
  // res.render('card', { prompt: "Who is buried in Grants Tomb?" });

  // We change our code from above to this. We connect the template to the first question. In the obeject we are passing in to the template, we point the "prompt" property to the first cards questions property. Also hint to the cards hint. 
  // res.render('card', {
  //   prompt: cards[req.params.id].question,
  //   hint: cards[req.params.id].hint
  // });


module.exports = router;