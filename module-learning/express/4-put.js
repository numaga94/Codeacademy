const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const currencies = {
  diram: {
    countries: ['UAE', 'Morocco']
  },
  real: {
    countries: ['Brazil']
  },
  dinar: {
    countries: ['Algeria', 'Bahrain', 'Jordan', 'Kuwait']
  },
  vatu: {
    countries: ['Vanuatu']
  },
  shilling: {
    countries: ['Tanzania', 'Uganda', 'Somalia', 'Kenya']
  }
};

app.put('/currencies/:name/countries', (req, res, next) => {
  const name = req.params.name;
  if (Object.keys(currencies).some((key) => key === name)) {
    currencies[name] = req.query;
    res.send(req.query);
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
