const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

const puddingFlavors = ['chocolate', 'banana', 'butterscotch', 'pistachio'];

// Your code here!
app.delete('/puddings/:flavor', (req, res, next) => {
  const paddingIndex = puddingFlavors.indexOf(req.params.flavor);
  if (paddingIndex !== -1) {
    puddingFlavors.splice(paddingIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
