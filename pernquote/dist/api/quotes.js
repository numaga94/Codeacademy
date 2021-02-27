'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const db_1 = __importDefault(require('../pg/db'));
const quoteRouter = express_1.default.Router();
// GET api/
quoteRouter.get('/quotess', (req, res, next) => {
  const { author, tag } = req.query;
  let sql = '';
  if (author && tag) {
    sql = `SELECT * FROM quotes WHERE author LIKE '%${author}%' AND tag LIKE '%${tag}%' ORDER BY random() LIMIT 20`;
  } else if (author && !tag) {
    sql = `SELECT * FROM quotes WHERE author LIKE '%${author}%' ORDER BY random() LIMIT 20`;
  } else if (!author && tag) {
    sql = `SELECT * FROM quotes WHERE tag LIKE '%${tag}%' ORDER BY random() LIMIT 20`;
  } else {
    sql = `SELECT * FROM quotes WHERE id BETWEEN 1 AND 10000 ORDER BY random() LIMIT 20`;
  }
  db_1.default.query(sql, (err, results) => {
    if (err) {
      next(err);
    } else if (results.rowCount > 0) {
      const { rowCount, rows } = results;
      res.json({
        quotes: {
          quantity: rowCount,
          content: rows
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});
// POST api/
quoteRouter.post('/quotes', (req, res, next) => {
  const apiKey = req.header('authorization');
  const { quote, author, tag } = req.body;
  // console.log({ apiKey }, { quote }, { author }, { tag });
  if (apiKey === 'Bearer GYRSChtO%4oN5Gv0N3D9') {
    if (!quote || !author || !tag) {
      res.sendStatus(404);
    } else {
      db_1.default.query(
        'INSERT INTO quotes (quote, author, tag) VALUES ($1, $2, $3) RETURNING *',
        [quote, author, tag],
        (err, results) => {
          if (err) {
            next(err);
          } else {
            res.status(201).json({ quote: results.rows[0] });
          }
        }
      );
    }
  } else {
    res.sendStatus(403);
  }
});
/* params to check if the requested ID does exists
 * if it exists pass req.quote to middleware
 * if it dosen't exist, return 404
 * if any errors occoured, return 400
 */
quoteRouter.param('id', (req, res, next, id) => {
  db_1.default.query('SELECT * FROM quotes WHERE id = $1', [id], (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else if (results.rowCount > 0) {
      req.body.quote = { quote: results.rows[0] };
      next();
    } else {
      res.sendStatus(404);
    }
  });
});
// GET /quotes/:id
quoteRouter.get('/quotes/:id', (req, res, next) => {
  res.json(req.body.quote);
});
exports.default = quoteRouter;
