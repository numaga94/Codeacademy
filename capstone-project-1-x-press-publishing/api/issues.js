const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Issue WHERE Issue.series_id = $seriesId', { $seriesId: req.params.seriesId }, (err, issues) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ issues });
    }
  });
});

issuesRouter.post('/', (req, res, next) => {
  const { name, issueNumber, publicationDate, artistId } = req.body.issue;
  if (!name || !issueNumber || !publicationDate || !artistId) {
    res.sendStatus(400);
  } else {
    const sql = `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) 
    VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)`;
    const values = {
      $name: name,
      $issueNumber: issueNumber,
      $publicationDate: publicationDate,
      $artistId: artistId,
      $seriesId: req.params.seriesId
    };

    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`, (err, issue) => {
          res.status(201).json({ issue });
        });
      }
    });
  }
});

issuesRouter.param('issueId', (req, res, next, issueId) => {
  db.get('SELECT * FROM Issue WHERE Issue.id = $issueId', { $issueId: issueId }, (err, issue) => {
    if (err) {
      next(err);
    } else if (issue) {
      req.issue = issue;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

issuesRouter.put('/:issueId', (req, res, next) => {
  const { name, issueNumber, publicationDate, artistId } = req.body.issue;
  // console.log(req.body.issue);
  if (!name || !issueNumber || !publicationDate || !artistId) {
    res.sendStatus(400);
  } else {
    const sql = `UPDATE Issue SET name = $name, issue_number = $issueNumber,
                publication_date = $publicationDate, artist_id = $artistId 
                WHERE Issue.id = $issueId`;
    const values = {
      $name: name,
      $issueNumber: issueNumber,
      $publicationDate: publicationDate,
      $artistId: artistId,
      $issueId: req.params.issueId
    };

    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Issue WHERE Issue.id = ${req.params.issueId}`, (err, issue) => {
          res.status(200).json({ issue });
        });
      }
    });
  }
});

issuesRouter.delete('/:issueId', (req, res, next) => {
  db.run('DELETE FROM Issue WHERE Issue.id = $issueId', { $issueId: req.params.issueId }, (err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = issuesRouter;
