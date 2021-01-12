const express = require('express');
const meetingRouter = express.Router();

const { createMeeting, getAllFromDatabase, addToDatabase, deleteAllFromDatabase } = require('./db');

// /api/meetings
// GET /api/meetings to get an array of all meetings.
meetingRouter.get('/', (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingRouter.post('/', (req, res, next) => {
  const meeting = createMeeting();

  if (meeting) {
    const newMeeting = addToDatabase('meetings', meeting);
    res.status(201).send(newMeeting);
  } else {
    res.status(400).send();
  }
});

// DELETE /api/meetings to delete all meetings from the database.
meetingRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingRouter;
