const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public', 'static')));
app.use(express.static(path.join(__dirname, 'public', 'static', 'styles')));
app.use(express.static(path.join(__dirname, 'public', 'static', 'scripts')));
app.use(express.static(path.join(__dirname, 'public', 'static', 'images')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'static', 'home.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
