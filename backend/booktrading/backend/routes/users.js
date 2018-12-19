const ejs = require('ejs');

module.exports = (app, knex, passport) => {
  app.get('/auth/github', passport.authenticate('github'));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.render('auth', {
        user: req.user
      });
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.json({ error: false, message: 'success' });
  });
};
