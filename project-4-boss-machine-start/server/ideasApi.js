const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// /api/ideas
function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  // console.log(req.idea);
  try {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  } catch (err) {
    res.status(400).send();
  }
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const idea = getFromDatabaseById('ideas', ideaId);
  if (idea !== -1 && isNumeric(ideaId) && idea) {
    res.status(200).send(idea);
  } else {
    res.status(404).send();
  }
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
  const idea = req.body;
  const updatedIdea = updateInstanceInDatabase('ideas', idea);
  if (updatedIdea) {
    res.status(200).send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaDelete = deleteFromDatabasebyId('ideas', ideaId);
  if (ideaDelete) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
