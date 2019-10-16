const express = require('express');

const app = express();

app.set('view engine', 'pug');

// Route Route
// we use an anon callback function that will run when the client requests this route
// this block is functionally the same as the one below, just written out in long format.
// app.get('/', (request, response)  => {
//   response.send('Aloha');
// });

// app.get('/', (req, res) => {
//   res.send('<h1>Aloha 1</h1>');
// });
/**
* Once we set up Pug, we switch res.send() to res.render() in our index route. We use the name of the pug template as the parameter
*/

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello', (req, res) => {
  res.send('<h2>Aloha 2</h2>');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000')
});