const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sql'
  }
});

app.use(bodyParser.json());

require('./routes')(app, knex);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
