const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

// Import and mount the expressionsRouter
const expressionsRouter = require('./3-expressions.js');
app.use('/expressions', expressionsRouter);

// Import and mount the expressionsRouter
const animalsRouter = require('./3-animals.js');
app.use('/animals', animalsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
