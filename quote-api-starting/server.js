const express = require('express');
const cors = require('cors');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  // console.log(randomQuote);
  res.json({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
  const { person } = req.query;
  if (!person) {
    res.json({ quotes });
  } else {
    const quote = quotes.filter((element) => element.person === person);
    if (quote.length > 0) {
      res.json({ quotes: quote });
    } else {
      res.sendStatus(404).send('NOT FOUND');
    }
  }
});

app.post('/api/quotes', (req, res, next) => {
  const { quote, person } = req.query;
  // console.log(quote, person);
  if (!quote || !person) {
    res.sendStatus(400);
  } else {
    quotes.push(req.query);
    res.json({ quote: req.query }).sendStatus(201);
  }
});

app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT}`);
});
