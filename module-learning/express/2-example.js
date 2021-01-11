const express = require('express');
const app = express();

const { getElementById, getIndexById, updateElement, seedElements, createElement } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');
const animals = [];
seedElements(animals, 'animals');

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

// Get all expressions
// http://localhost:4001/expressions
app.get('/expressions', (req, res, next) => {
  res.send(expressions);
});

// Get a single expression
// http://localhost:4001/expressions/3
app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// Update an expression
// localhost:4001/expressions/3?emoji=😎&name=happy
app.put('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Create an expression
// localhost:4001/expressions?emoji=😎&name=happy
app.post('/expressions', (req, res, next) => {
  const receivedExpression = createElement('expressions', req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

// Delete an expression
// localhost:4001/expressions/3
app.delete('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.get('/animals', (req, res, next) => {
  res.send(animals);
});

app.get('/animals/:id', (req, res, next) => {
  const espId = getElementById(req.params.id, animals);
  if (espId) {
    res.send(espId);
  } else {
    res.status(404).send();
  }
});

app.put('/animals/:id', (req, res, next) => {
  const espId = getIndexById(req.params.id, animals);
  if (espId !== -1) {
    updateElement(req.params.id, req.query, animals);
    res.status(200).send(req.query);
  } else {
    res.status(404).send();
  }
});

app.post('/animals', (req, res, next) => {
  const newEsp = createElement('animals', req.query);
  if (newEsp) {
    animals.push(newEsp);
    res.status(201).send(newEsp);
  } else {
    res.status(400).send();
  }
});

app.delete('/animals/:id', (req, res, next) => {
  const espId = getIndexById(req.params.id, animals);
  if (espId !== -1) {
    animals.splice(espId, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
