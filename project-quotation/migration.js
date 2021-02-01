const sqlite = require('sqlite3');
const populate = require('./seed');
const db = new sqlite.Database('./dist/src/database.sqlite');

// create sqlite database
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Quote', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('creating table...');
    }
  });

  db.run(
    `CREATE TABLE Quote (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote TEXT NOT NULL,
      author TEXT NOT NULL,
      tag TEXT NOT NULL
     )`,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        populate();
      }
    }
  );
});
