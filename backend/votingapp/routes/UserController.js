module.exports = (app, passport) => {

  app.post('/auth/register', passport.authenticate('local-register'), (req, res) => {
    res.json({ user: req.user });
  });

  app.post('/auth/login', passport.authenticate('local-login'), (req, res) => {
    res.json({ user: req.user });
  });

  app.get('/', (req, res) => {
    res.json({ user: req.isAuthenticated() });
  });

};