const isAuthenticated = require('./helpers').isAuthenticated;

module.exports = (app, knex, passport) => {
  app.get('/api/v1/books', (req, res) => {
    knex('books')
      .select('*')
      .then(rows => {
        res.json({
          error: false,
          message: {
            data: rows
          }
        });
      });
  });

  // should be authenticated
  app.post('/api/v1/book', isAuthenticated, (req, res) => {
    const { name, author } = req.body;
    const userId = 1;
    knex('books')
      .insert({ name, author, userId })
      .then(rows => {
        console.log(rows);
        res.send('add a book');
      });
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
