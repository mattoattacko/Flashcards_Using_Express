const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

app.set('view engine', 'pug');

// Since routes has an index.js file, we don't need to referr to it when we require it. No need './routes/index.js'
const mainRoutes = require('./routes');
// Here we are pointing directly to the cards file. 
const cardRoutes = require('./routes/cards');

// We can now use the 'routes' variable that we declared to make middleware. We call app.use and pass in the routes variable where all our routes live. 
app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  // This middleware is responsible for creating the Error object and handing it off to the error handler. 
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
// inside the handler, we render a template back to the client called 'error'. The error object has properties that hold the data about the error,so we can pass it in as the second argument to the render function. This gives the template access to the error data. We create the template in the views folder. 
// We set the error property on res.locals to equal the error object.
// We set the status of the response using the status method on the response object. Status method takes the number of the code. 500 is the general error. We set that above in our first error MW above. We pass that into our status method here. 
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000')
});