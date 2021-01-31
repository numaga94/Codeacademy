const express = require('express');
const timesheetRouter = express.Router({ mergeParams: true });
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// GET /api/employees/:employeeId/timesheets
timesheetRouter.get('/', (req, res, next) => {
  db.all(
    'SELECT * FROM Timesheet WHERE Timesheet.employee_id = $employeeId',
    { $employeeId: req.params.employeeId },
    (err, timesheets) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ timesheets });
      }
    }
  );
});

// POST /api/employees/:employeeId/timesheets
timesheetRouter.post('/', (req, res, next) => {
  const { hours, rate, date } = req.body.timesheet;
  if (!hours || !rate || !date) {
    res.sendStatus(400);
  } else {
    const sql = 'INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES ($hours, $rate, $date, $employeeId)';
    const values = {
      $hours: hours,
      $rate: rate,
      $date: date,
      $employeeId: req.params.employeeId
    };
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get('SELECT * FROM Timesheet WHERE Timesheet.id = $id', { $id: this.lastID }, (err, timesheet) => {
          res.status(201).json({ timesheet });
        });
      }
    });
  }
});

// Param for 'timesheetId'
timesheetRouter.param('timesheetId', (req, res, next, timesheetId) => {
  db.get(
    'SELECT * FROM Timesheet WHERE Timesheet.id = $timesheetId',
    { $timesheetId: timesheetId },
    (err, timesheet) => {
      if (err) {
        next(err);
      } else if (timesheet) {
        req.timesheet = timesheet;
        next();
      } else {
        res.sendStatus(404);
      }
    }
  );
});

// PUT /api/employees/:employeeId/timesheets/:timesheetId
timesheetRouter.put('/:timesheetId', (req, res, next) => {
  const { hours, rate, date } = req.body.timesheet;
  if (!hours || !rate || !date) {
    res.sendStatus(400);
  } else {
    const sql =
      'UPDATE Timesheet SET hours = $hours, rate = $rate, date = $date, employee_id = $employeeId WHERE Timesheet.id = $timesheetId';
    const values = {
      $hours: hours,
      $rate: rate,
      $date: date,
      $employeeId: req.params.employeeId,
      $timesheetId: req.params.timesheetId
    };
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(
          'SELECT * FROM Timesheet WHERE Timesheet.id = $timesheetId',
          { $timesheetId: req.params.timesheetId },
          (err, timesheet) => {
            if (err) {
              next(err);
            } else {
              res.status(200).json({ timesheet });
            }
          }
        );
      }
    });
  }
});

// DELETE /api/employees/:employeeId/timesheets/:timesheetId
timesheetRouter.delete('/:timesheetId', (req, res, next) => {
  db.run('DELETE FROM Timesheet WHERE Timesheet.id = $timesheetId', { $timesheetId: req.params.timesheetId }, (err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = timesheetRouter;
