const express = require('express');
const router = express.Router();
const { data } = require('./data/flashcardData.json');
const { cards } = data;

// This block of code helps redirect a user to random cards.
// We create a new route using the router.get method. 
// Since we are inside a router that is mounted in the cards route in the app.js file "app.use('/cards',...", we dont need to start any of our URLs with "cards"
router.get('/' , ( req, res ) => {
  // To get the total number of cards we can choose from, we just use the "length" property on the "cards" array.
  const numberOfCards = cards.length;

  // This is just generating a random number. 
  // We multiple our random number by the length of the array from above. 
  // We use Math.floor to convert the result into a random integer. 
  const flashcardId = Math.floor( Math.random() * numberOfCards );

  // We take the number we got from above and use it to move to a different page.  
  res.redirect( `/cards/${flashcardId}` )
});

/**
 * This route serves individual cards/pages
*/
router.get('/:id', (req, res) => {
  // Here we check for the presence of a query string key side. Assigned to var "side".
  const { side } = req.query;
  // Since "question" and "answer" are properties on the json, we can use the value stored in "side" to find the text we want to display.
  // We need the id of the card. We create a variable to hold the id from the route paramater. 
  const { id } = req.params;

  // This will check for the presence of a side.
  // If the side doesnt exist, we want to redirect to the same card with the query string added, pointing to the question side. 
  if ( !side ) {
    return res.redirect(`/cards/${id}?side=question`);
}
  // We declare "name" and assign the "username" value from the requests "cookies". We then pass the "name" into the template (templateData below).
  const name = req.cookies.username;
  // Now we can access the two pieces of text that we want to use. We store it in a constant named "text".
  const text = cards[id][side];
  // We also want to store a reference to the hint. 
  const { hint } = cards[id];

  // Now we route the text and the hint into an object that we can pass into the template. "{ text, hint }"
  // In order to show the hint only on the question side of the card, we will remove it from where the templateData variable is declared. 
  // We pass in the "id" to templateData 
  const templateData = { id, text, name };

  // To only display the hint on question side, we add an if statement, setting the hint property to equal "hint" when the "side" is holding the 'question' string. 
  if ( side === 'question' ) {
    templateData.hint = hint;

    // We assign values to "sideToShow" and "sideToShowDisplay" based on which side our url points to. 
    // If it's the "question" side in the query string, it should point to the answer. 
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';

    // We use an else if clause to do the opposite. If it's the "answer" side in the query string, it should point to the question. 
  } else if ( side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData)
});

module.exports = router;
