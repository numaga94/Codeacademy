const express = require('express');
const seriesRouter = express.Router();
const sqlite = require('sqlite3');
const issuesRouter = require('./issues');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

seriesRouter.use('/:seriesId/issues', issuesRouter);

/*
/api/series
- GET
  - Returns a 200 response containing all saved series on the `series` 
  property of the response body
- POST
  - Creates a new series with the information from the `series` property
   of the request body and saves it to the database. Returns a 201 
   response with the newly-created series on the `series` property 
   of the response body
  - If any required fields are missing, returns a 400 response
*/

seriesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Series', (err, series) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ series });
    }
  });
});

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
  db.get('SELECT * FROM Series WHERE Series.id = $seriesId', { $seriesId: seriesId }, (err, series) => {
    if (err) {
      next(err);
    } else if (series) {
      req.series = series;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

seriesRouter.get('/:seriesId', (req, res, next) => {
  res.status(200).json({ series: req.series });
});

seriesRouter.post('/', (req, res, next) => {
  const { name, description } = req.body.series;
  if (!name || !description) {
    return res.sendStatus(400);
  } else {
    const sql = `INSERT INTO Series (name, description) 
    VALUES ($name, $description)`;
    const values = {
      $name: name,
      $description: description
    };

    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, (err, series) => {
          res.status(201).json({ series });
        });
      }
    });
  }
});

seriesRouter.put('/:seriesId', (req, res, next) => {
  const { name, description } = req.body.series;
  if (!name || !description) {
    res.sendStatus(400);
  } else {
    const sql = `UPDATE Series SET name = $name, description = $description WHERE Series.id = $seriesId`;
    const values = {
      $name: name,
      $description: description,
      $seriesId: req.params.seriesId
    };

    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Series WHERE Series.id = ${req.params.seriesId}`, (err, series) => {
          res.status(200).json({ series });
        });
      }
    });
  }
});

seriesRouter.delete('/:seriesId', (req, res, next) => {
  db.get('SELECT * FROM Issue WHERE Issue.series_id = $seriesId', { $seriesId: req.params.seriesId }, (err, issue) => {
    if (err) {
      next(err);
    } else if (issue) {
      res.sendStatus(400);
    } else {
      db.run('DELETE FROM Series WHERE Series.id = $id', { $id: req.params.seriesId }, (err) => {
        if (err) {
          next(err);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});

module.exports = seriesRouter;
