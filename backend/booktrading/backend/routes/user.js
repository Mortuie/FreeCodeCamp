const ejs = require('ejs');

module.exports = (app, knex, passport) => {
  app.get('/auth/github', passport.authenticate('github'));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('UMMM');
      // res.send('<h1>HELLO WORLD</h1>');
      res.render('auth', {
        user: req.user
      });
      // res.redirect('/');
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
