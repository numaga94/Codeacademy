const sqlite = require('sqlite3');
const db = new sqlite.Database('./dist/src/database.sqlite');
const fs = require('fs');

// parsing text

function parseText() {
  const content = fs.readFileSync('./quote_src/quotes.txt', 'utf-8'); // parse the text
  const cells = content.split(/\r?\n|\r/).map((element) => {
    // console.log(el.split(';'));
    return element.split(';');
  });
  cells.shift();
  return cells;
}

// populate Quote table

function populate() {
  parseText().forEach((cell, index) => {
    // if (index < 10) {
    //   console.log(cell);
    // }

    const sql = 'INSERT INTO Quote (quote, author, tag) VALUES ($quote, $author, $tag)';
    const values = {
      $quote: cell[0],
      $author: cell[1],
      $tag: cell[2]
    };
    db.run(sql, values, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });

  db.get("SELECT COUNT(quote) AS 'count' FROM Quote", (err, count) => {
    if (err) {
      console.error(err);
    } else if (count) {
      console.log(`Quote table is successfully seeded with ${count.count} rows.`);
    } else {
      console.log('There is something wrong when populate the table.');
    }
  });
}

module.exports = populate;
