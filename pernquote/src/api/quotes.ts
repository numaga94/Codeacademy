import express, { IRouter } from 'express';
import pool from '../pg/db';

const quoteRouter: IRouter = express.Router();

// GET api/
quoteRouter.get('/quote', (req, res, next) => {
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
  pool.query(sql, (err, results) => {
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
quoteRouter.post('/quote', (req, res, next) => {
  const apiKey = req.header('authorization');
  const { quote, author, tag } = req.body;
  // console.log({ apiKey }, { quote }, { author }, { tag });

  if (apiKey === 'Bearer GYRSChtO%4oN5Gv0N3D9') {
    if (!quote || !author || !tag) {
      res.sendStatus(404);
    } else {
      pool.query(
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
quoteRouter.param('id', (req, res, next, id: string) => {
  pool.query('SELECT * FROM quotes WHERE id = $1', [id], (err, results) => {
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

// GET /quote/:id
quoteRouter.get('/quote/:id', (req, res, next) => {
  res.json(req.body.quote);
});

// PUT /quote/:id
quoteRouter.put('/quote/:id', (req, res, next) => {});

export default quoteRouter;
