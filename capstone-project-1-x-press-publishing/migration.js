const sqlite = require('sqlite3');
const db = new sqlite.Database('./database.sqlite');

/*
On the database object, run a SQLite command to create an Artist table 
(if it doesn’t already exist) with the following schema:

id - Integer, primary key, required
name - Text, required
date_of_birth - Text, required
biography - Text, required
is_currently_employed - Integer, defaults to 1
*/

db.serialize(() => {
  db.run('drop table if exists Artist');
  db.run(
    `create table Artist (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    biography TEXT NOT NULL,
    is_currently_employed INTEGER DEFAULT 1
  )`,
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Artist tabls is created.');
    }
  );
});

/*
Series

id - Integer, primary key, required
name - Text, required
description - Text, required
*/

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Series');
  db.run(
    `CREATE TABLE Series (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Series table is created.');
      }
    }
  );
});

/*
Issue

id - Integer, primary key, required
name - Text, required
issue_number - Text, required
publication_date - Text, required
artist_id - Integer, foreign key, required
series_id - Integer, foreign key, required
*/

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Issue');
  db.run(
    `CREATE TABLE Issue (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    issue_number TEXT NOT NULL,
    publication_date TEXT NOT NULL,
    artist_id INTEGER NOT NULL,
    series_id INTEGER NOT NULL,
    FOREIGN KEY(artist_id) REFERENCES Artist(id), 
    FOREIGN KEY(series_id) REFERENCES Series(id)
  )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Issue table is created.');
      }
    }
  );
});
