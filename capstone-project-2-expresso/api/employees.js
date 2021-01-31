const express = require('express');
const employeeRouter = express.Router();
const sqlite = require('sqlite3');
const timesheetRouter = require('./timesheets');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// GET /api/employees
employeeRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Employee WHERE Employee.is_current_employee = 1', (err, employees) => {
    if (err) {
      res.sendStatus(404);
    } else res.status(200).json({ employees });
  });
});

// POST /api/employees
employeeRouter.post('/', (req, res, next) => {
  const { name, position, wage } = req.body.employee;
  const isCurrentEmployee = req.body.employee.isCurrentEmployee === 0 ? 0 : 1;
  if (!name || !position || !wage) {
    res.sendStatus(400);
  } else {
    const sql =
      'INSERT INTO Employee (name, position, wage, is_current_employee) VALUES ($name, $position, $wage, $isCurrentEmployee)';
    const values = {
      $name: name,
      $position: position,
      $wage: wage,
      $isCurrentEmployee: isCurrentEmployee
    };

    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Employee WHERE Employee.id = ${this.lastID}`, (err, employee) => {
          res.status(201).json({ employee });
        });
      }
    });
  }
});

employeeRouter.param('employeeId', (req, res, next, employeeId) => {
  db.get('SELECT * FROM Employee WHERE Employee.id = $employeeId', { $employeeId: employeeId }, (err, employee) => {
    if (err) {
      next(err);
    } else if (employee) {
      req.employee = employee;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// GET /api/employees/:employeeId
employeeRouter.get('/:employeeId', (req, res, next) => {
  res.status(200).json({ employee: req.employee });
});

// PUT /api/employees/:employeeId
employeeRouter.put('/:employeeId', (req, res, next) => {
  const { name, position, wage } = req.body.employee;
  const isCurrentEmployee = req.body.employee.isCurrentEmployee === 1 ? 1 : 0;
  if (!name || !position || !wage) {
    res.sendStatus(400);
  } else {
    const sql =
      'UPDATE Employee SET name = $name, position = $position, wage = $wage, is_current_employee = $isCurrentEmployee WHERE Employee.id = $employeeId';
    const values = {
      $name: name,
      $position: position,
      $wage: wage,
      $isCurrentEmployee: isCurrentEmployee,
      $employeeId: req.params.employeeId
    };

    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Employee WHERE Employee.id = ${req.params.employeeId}`, (err, employee) => {
          res.status(200).json({ employee });
        });
      }
    });
  }
});

// DELETE /api/employees/:employeeId
employeeRouter.delete('/:employeeId', (req, res, next) => {
  const sql = 'UPDATE Employee SET is_current_employee = 0 WHERE Employee.id = $employeeId';
  const values = {
    $employeeId: req.params.employeeId
  };

  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(
        'SELECT * FROM Employee WHERE Employee.id = $employeeId',
        { $employeeId: req.params.employeeId },
        (err, employee) => {
          res.status(200).json({ employee });
        }
      );
    }
  });
});

// mount timesheets module
employeeRouter.use('/:employeeId/timesheets', timesheetRouter);

module.exports = employeeRouter;
