const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const battlefields = {
  fortSumter: {
    state: 'SC'
  },
  manassas: {
    state: 'VA'
  },
  gettysburg: {
    state: 'PA'
  },
  antietam: {
    state: 'MD'
  }
};

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/battlefields/:name', (req, res, next) => {
  const battlefieldName = req.params.name;
  const isNameExisted = (name, obj) => {
    return Object.keys(obj).some((val) => val === name);
  };
  if (isNameExisted(battlefieldName, battlefields)) {
    res.send(battlefields[battlefieldName]);
  } else {
    res.status(404).send();
  }
});
