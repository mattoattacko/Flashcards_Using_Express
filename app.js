const express = require('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false})); 
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

app.get('/cards', (req, res) => {
  // here we pass in an object with the property "prompt", set to a question we want to ask. 
  res.render('card', { prompt: "Who is buried in Grants Tomb?" });
});

// Here is a simple example of adding a route and rendering it. This get route is for serving the form itself.
app.get('/hello', (req, res) => {
  res.render('hello');
});

// This rerenders the form after we send the name to the server.
app.post('/hello', (req, res) => {
  // Here we are passing in the name our user enters to the render method. 
  res.render('hello', { name: req.body.username }); 
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000')
});