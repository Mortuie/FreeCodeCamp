const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const esession = require('express-session');
const confs = require('./config');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'postgres'
  }
});

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

confs.pconf(passport, knex);

// middleware
app.use(bodyParser.json());
app.use(
  esession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});
