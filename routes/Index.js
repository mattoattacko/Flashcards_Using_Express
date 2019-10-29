const express = require('express');
const router = express.Router();

// Route Route
// we use an anon callback function that will run when the client requests this route
// this block is functionally the same as the one below, just written out in long format.
// router.get('/', (request, response)  => {
//   response.send('Aloha');
// });

// router.get('/', (req, res) => {
//   res.send('<h1>Aloha 1</h1>');
// });
/**
* Once we set up Pug, we switch res.send() to res.render() in our index route. We use the name of the pug template as the parameter
*/

// We often pass middleware as an anon function into the router.use method. This middleware will run everytime a request comes into our application. 
// router.use((req, res, next) => {
//   // We use the request object to pass the data from the first mw function to the next mw function. 
//   req.message = 'Hi Im Message One';
//   next();
// });

// // Testing to see if we can modify the request object
// router.use((req, res, next) => {
//   console.log(req.message);
//   next();
// });

// router.use((req, res, next) =>{
//   console.log("hello");
//   const err = new Error('This is an error message 1');
//   err.status = 500;
//   next(err);
// });

// This is the index route
router.get('/', (req, res) => {
  const name = req.cookies.username;
  // Here, since both the key and the value have the same name, we can use the ES6 shorthand to remove the colon and extra name. So instead of {name:name}, we can do just {name}.
  // If the value of "name" exists, we want to render the index template. Else, redirect to the hellow route. 
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});



// Here is a simple example of adding a route and rendering it. This get route is for serving the form itself.
router.get('/hello', (req, res) => {
  // If the value of "name" exists already, we want to redirect them to the index route, else render the "hello" form. Basically this redirects based on the cookies value. 
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

// This rerenders the form after we send the name to the server.
router.post('/hello', (req, res) => {
  // We set the cookie when the user submits the form to the post route. This sends a cookie to the browser after we submit the form. 
  res.cookie('username', req.body.username);
  // Here we are passing in the name our user enters to the render method. 
  res.redirect('/'); 
});

// This POST route uses the clearCookie method to clear the cookies unsername value. It then redirects people to the "hello" route. 
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;