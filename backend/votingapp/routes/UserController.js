module.exports = (app, passport) => {

  app.post('/auth/register', (req, res, next) => {
    passport.authenticate('local-register', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.status(401).json({ message: info.message }) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({ user: true });
      });
    })(req, res, next);
  });

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) return next(err);

      if (!user) return res.status(401).json({ message: info.message });

      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.json({ user: true });
      });
    })(req, res, next);
  });

  app.get('/auth/session/check', (req, res) => {
    res.json({ user: req.isAuthenticated() });
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.json({ user: 'Logged out' });
  });
};