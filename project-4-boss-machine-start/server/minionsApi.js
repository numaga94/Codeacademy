const express = require('express');
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// /api/minions
function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const body = req.body;
  try {
    const newMinion = addToDatabase('minions', body);
    res.status(201).send(newMinion);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  const minion = getFromDatabaseById('minions', id);
  if (minion !== -1 && isNumeric(id) && minion) {
    res.status(200).send(minion);
  } else {
    res.status(404).send();
  }
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  const id = String(req.params.minionId);
  const minion = getFromDatabaseById('minions', id);
  if (minion !== -1 && isNumeric(id) && minion) {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
  } else {
    res.status(404).send();
  }
});
// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  const id = String(req.params.minionId);
  const minion = getFromDatabaseById('minions', id);
  if (minion !== -1 && isNumeric(id) && minion) {
    deleteFromDatabasebyId('minions', id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const works = getAllFromDatabase('work');
  res.send(works);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const body = req.body;
  if (body) {
    const newWork = addToDatabase('work', body);
    res.status(201).send(newWork);
  } else {
    res.status(400).send();
  }
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  const id = req.params.minionId;
  const work = getFromDatabaseById('work', String(id));
  if (work !== -1 && isNumeric(id) && work) {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.status(200).send(updatedWork);
  } else {
    res.status(400).send();
  }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const workId = req.params.workId;
  const deleteWork = deleteFromDatabasebyId('work', String(workId));
  if (deleteWork && isNumeric(workId)) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
