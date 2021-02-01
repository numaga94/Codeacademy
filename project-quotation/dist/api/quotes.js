const express = require('express');
const quoteRouter = express.Router();
const sqlite = require('sqlite3');
const db = new sqlite.Database('../src/database.sqlite');

// GET http://localhost:4000/api/quotes?author=mark twain&tag=love
quoteRouter.get('/', (req, res, next) => {
  const { author, tag } = req.query;
  if (!author && !tag) {
    // count total rows of database
    db.all('SELECT DISTINCT * FROM Quote ORDER BY random() LIMIT 20', (err, rows) => {
      if (err) {
        next(err);
      } else {
        const quotes = {};
        quotes.quantity = rows.length;
        quotes.content = rows;
        res.status(200).json({ quotes });
      }
    });
  } else if (author && tag) {
    db.all(
      'SELECT DISTINCT * FROM Quote WHERE Quote.author LIKE $author AND Quote.tag LIKE $tag ORDER BY random() LIMIT 20',
      { $author: `%${author}%`, $tag: `%${tag}%` },
      (err, rows) => {
        if (err) {
          next(err);
        } else if (rows.length > 0) {
          const quotes = {};
          quotes.quantity = rows.length;
          quotes.content = rows;
          res.status(200).json({ quotes });
        } else {
          res.sendStatus(404);
        }
      }
    );
  } else if (author || tag) {
    db.all(
      'SELECT DISTINCT * FROM Quote WHERE Quote.author LIKE $author OR Quote.tag LIKE $tag ORDER BY random() LIMIT 20',
      { $author: `%${author}%`, $tag: `%${tag}%` },
      (err, rows) => {
        if (err) {
          next(err);
        } else if (rows.length > 0) {
          const quotes = {};
          quotes.quantity = rows.length;
          quotes.content = rows;
          res.status(200).json({ quotes });
        } else {
          res.sendStatus(404);
        }
      }
    );
  } else {
    res.sendStatus(404);
  }
});

module.exports = quoteRouter;
