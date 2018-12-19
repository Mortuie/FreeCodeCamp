const isAuthenticated = require('./helpers').isAuthenticated;

module.exports = (app, knex, passport) => {
  app.get('/api/v1/books', (req, res) => {
    res.send('get all books');
  });

  // should be authenticated
  app.post('/api/v1/book', (req, res) => {
    res.send('add a book');
  });

  // should be auth
  app.get('/api/v1/trades', (req, res) => {
    res.send('get a users trades');
  });

  // should be auth
  app.post('/api/v1/trade', (req, res) => {
    res.send('propose a trade');
  });
};
