const express = require('express');
const artistsRouter = express.Router();
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

/* Within the GET / handler, execute a sqlite3 query that 
will retrieve all entries in the Artist table where 
is_currently_employed is equal to 1. This will retrieve 
all currently-employed artists.*/

artistsRouter.get('/', (req, res, next) => {
  db.all('select * from Artist where is_currently_employed = 1', (err, artists) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ artists });
    }
  });
});

/*
Our GET, PUT, and DELETE route paths will have an :artistId parameter. 
For both, we will have to check that an artist with that ID exists and 
if not send a 404 response. Let’s add a router param to reduce boilerplate code.

Add a router param of artistId to the router.

Within the artist param callback, execute a SQL query which will get the artist with the given ID.
*/
artistsRouter.param('artistId', (req, res, next, artistId) => {
  db.get('select * from Artist where id = $id', { $id: artistId }, (err, artist) => {
    if (err) {
      next(err);
    } else if (artist) {
      req.artist = artist;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

/*
GET /api/artist/:artistId handler.

Register another GET handler at the above path segment. Our router param 
should already handle all of the necessary SQL and error-handling logic and attach the retrieved artist at req.artist.

Within the handler’s callback function, return a 200 response with a JSON body 
containing a key of artist and a value of the retrieved artist.

When you think your /api/artists/:artistId GET route is ready, run the testing suite to check your work.
*/

artistsRouter.get('/:artistId', (req, res, next) => {
  res.status(200).json({ artist: req.artist });
});

/*
POST handler at the / path segment. Within the callback function of this handler, check that all required fields 
are present on the artist object of the request body (name, dateOfBirth, and biography). If not, send a 400 response.

Additionally check to see if is_currently_employed was set on the request’s artist object. If not, set it to 1. 
This will simplify our SQL logic in the next step.

Next, execute a SQL query to create a new Artist with the supplied attributes.
*/

artistsRouter.post('/', (req, res, next) => {
  const { name, dateOfBirth, biography } = req.body.artist;
  const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;
  if (!name || !dateOfBirth || !biography) {
    return res.sendStatus(400);
  } else {
    const sql =
      'INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)';
    const values = {
      $name: name,
      $dateOfBirth: dateOfBirth,
      $biography: biography,
      $isCurrentlyEmployed: isCurrentlyEmployed
    };
    db.run(sql, values, function (error) {
      if (error) {
        next(error);
      } else {
        db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`, (error, artist) => {
          // console.log({ artist });
          res.status(201).json({ artist });
        });
      }
    });
  }
});

/*
PUT handler at /:artistId to your router. Check to ensure all required fields are present in the request body, if not send a 400 response.

Execute a SQL statement to update the artist with the supplied artist ID to have the supplied updated attributes.

In the callback of the update statement, pass any errors down the middleware chain, if present. Otherwise, retrieve the newly-updated 
artist from the database and send it in the response with a 200 status code.
*/

artistsRouter.put('/:artistId', (req, res, next) => {
  const { name, dateOfBirth, biography, isCurrentlyEmployed } = req.body.artist;
  // console.log({ name }, { dateOfBirth }, { biography }, { isCurrentlyEmployed });
  if (!name || !dateOfBirth || !biography || !isCurrentlyEmployed) {
    return res.sendStatus(400);
  } else {
    const sql =
      'UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, biography = $biography, is_currently_employed = $isCurrentlyEmployed WHERE Artist.id = $artistId';
    const values = {
      $name: name,
      $dateOfBirth: dateOfBirth,
      $biography: biography,
      $isCurrentlyEmployed: isCurrentlyEmployed,
      $artistId: req.params.artistId
    };

    db.run(sql, values, function (error) {
      if (error) {
        next(error);
      } else {
        db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`, (error, artist) => {
          // console.log({ artist });
          res.status(200).json({ artist });
        });
      }
    });
  }
});

/*
delete handler. This will be slightly different than a normal delete — instead of deleting the artist, we will mark them as unemployed.

Add a delete handler at /:artistId. Within the handler’s callback function, run a SQL query to update the artist with the supplied 
artist ID to have is_currently_employed equal to 0.

Handle any errors and send successfully-updated artists with 200 responses.

When you think your DELETE route is ready, run the testing suite to check your work.

At this point when you load the X-Press Publishing app, a list of all saved artists should load on the landing page. Clicking one of 
them should allow you to view, update, and delete that artist. You should additionally be able to create new artists by clicking 
the ‘New Artist’ button on the landing page.
*/

artistsRouter.delete('/:artistId', (req, res, next) => {
  const sql = 'UPDATE Artist SET is_currently_employed = 0 WHERE Artist.id = $artistId';
  const values = {
    $artistId: req.params.artistId
  };

  db.run(sql, values, function (error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`, (err, artist) => {
        res.status(200).json({ artist });
      });
    }
  });
});

module.exports = artistsRouter;
