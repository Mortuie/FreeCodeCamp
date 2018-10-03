module.exports = (app, passport) => {

  app.post('/auth/register', (req, res, next) => {
    passport.authenticate('local-register', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.status(403).json({ message: info.message }) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({ user: req.user });
      });
    })(req, res, next);
  });

  app.post('/auth/login', passport.authenticate('local-login'), (req, res) => {
    res.json({ user: req.user });
  });

  app.get('/auth/session/check', (req, res) => {
    res.json({ user: req.isAuthenticated() });
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.json({ user: 'Logged out' });
  });
};