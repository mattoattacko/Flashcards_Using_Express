const express = require('express');

const app = express();

// Route Route
// we use an anon callback function that will run when the client requests this route
app.get('/', (request, response)  => {
  response.send('Aloha');
});

app.listen(3000);