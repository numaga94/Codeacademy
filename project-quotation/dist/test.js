const fs = require('fs');
const parse = require('csv-parse');
const axios = require('axios');

// const csvData = [];
fs.createReadStream('./src/quotes_dataset.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', function (csvrow) {
    // console.log(csvrow);
    //do something with csvrow
    const quote = csvrow[0];
    const author = csvrow[1];
    const tag = csvrow[2] !== '' ? csvrow[2] : 'attributed-no-source';
    // csvData.push([quote, author, tag]);
    setInterval(() => {
      axios
        .post(
          'http://localhost:5000/api/quote/',
          {
            quote: quote,
            author: author,
            tag: tag
          },
          {
            headers: {
              authorization: 'Bearer GYRSChtO%4oN5Gv0N3D9'
            }
          }
        )
        .then((data) => console.log(data.status))
        .catch((err) => console.error(err.message));
    }, 1000);
  })
  .on('end', function () {
    //do something with csvData
    // console.log(csvData);
    console.log('post completed');
    // return csvData;
    // csvData.forEach((quote) => {
    //   try {
    //     axios.post(
    //       'http://localhost:4000/api/quote/',
    //       {
    //         quote: quote[0],
    //         author: quote[1],
    //         tag: quote[2]
    //       },
    //       {
    //         headers: {
    //           authorization: 'Bearer GYRSChtO%4oN5Gv0N3D9'
    //         }
    //       }
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
  });
