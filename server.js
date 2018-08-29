const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('getti meni perille')
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});