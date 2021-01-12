const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const soups = ['gazpacho', 'borscht', 'primordial', 'avgolemono', 'laksa'];

app.post('/soups', (req, res, next) => {
  const isNewSoup = soups.some((value) => value !== req.query.name);
  if (isNewSoup) {
    soups.push(req.query.name);
    res.status(201).send(req.query.name);
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
