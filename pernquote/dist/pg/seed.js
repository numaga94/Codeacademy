"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parse_1 = __importDefault(require("csv-parse"));
const fs_1 = require("fs");
const db_1 = __importDefault(require("./db"));
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
const csvData = [];
fs_1.createReadStream('/Users/yu/Projects/Codeacademy/pernquote/src/pg/quotes_sample.csv')
    .pipe(csv_parse_1.default({ delimiter: ',' }))
    .on('data', function (csvrow) {
    // console.log(csvrow);
    //do something with csvrow
    // csvData.push([csvrow[0], csvrow[1], csvrow[2]]);
    const quote = csvrow[0];
    const author = csvrow[1];
    const tag = csvrow[2] !== '' ? csvrow[2] : 'attributed-no-source';
    // console.log({ quote }, { author }, { tag });
    db_1.default.query('INSERT INTO quotes (quote, author, tag) VALUES ($1, $2, $3) RETURNING *', [quote, author, tag], (err, results) => {
        if (err) {
            // console.error(err.message);
            console.log(err);
        }
        else {
            console.log(results.rows[0]);
        }
    });
})
    .on('end', function () {
    //do something with csvData
    console.log(csvData);
});
