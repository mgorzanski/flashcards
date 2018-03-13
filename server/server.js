const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => console.log('Welcome!'));

app.listen(port);
console.log(`Server started at http://localhost:${port}...`);