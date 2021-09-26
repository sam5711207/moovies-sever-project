const http = require('http');

// const hostname = 'moviesActors';
const port = 3000;
const express = require('express');
const app = express();

const actorsRouter = require('./routes/actors_routes')

app.use(actorsRouter)

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
app.listen(port
  , 
  // hostname,
   () => {
  console.log(`Server running at localhost:
  ${port}/`);
});