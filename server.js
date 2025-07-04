const express = require('express');
const path = require('path');

const app = express();

app.use(express.json()); // if you add POST /evaluate later

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Frontend server running on port ${port}`);
});
