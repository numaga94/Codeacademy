import parse from 'csv-parse';
import { createReadStream } from 'fs';
import pool from './db';

// create table quotes
// pool.query('DROP TABLE quotes', (err, res) => {
//   if (!err) {
//     pool.query(
//       'CREATE TABLE quotes (quote_id SERIAL PRIMARY KEY, quote TEXT NOT NULL, author VARCHAR(100) NOT NULL, tag VARCHAR(255) NOT NULL)',
//       (err) => {
//         if (err) {
//           console.error(err.message);
//         } else {
//           console.log('quotes table is created');
//         }
//       }
//     );
//   } else {
//     console.error(err.message);
//   }
// });

const csvData: string[][] = [];
createReadStream('/Users/yu/Projects/Codeacademy/pernquote/src/pg/quotes_sample.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', function (csvrow) {
    // console.log(csvrow);
    //do something with csvrow
    // csvData.push([csvrow[0], csvrow[1], csvrow[2]]);
    const quote = csvrow[0];
    const author = csvrow[1];
    const tag = csvrow[2] !== '' ? csvrow[2] : 'attributed-no-source';
    // console.log({ quote }, { author }, { tag });
    pool.query(
      'INSERT INTO quotes (quote, author, tag) VALUES ($1, $2, $3) RETURNING *',
      [quote, author, tag],
      (err, results) => {
        if (err) {
          // console.error(err.message);
          console.log(err);
        } else {
          console.log(results.rows[0]);
        }
      }
    );
  })
  .on('end', function () {
    //do something with csvData
    console.log(csvData);
  });
