module.exports = (app, knex, passport) => {
  app.get('/auth/github', passport.authenticate('github'));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout', (req, res) => {
    console.log('TRYING TO LOGOUT');
    req.logout();
    res.redirect('/');
  });
};
