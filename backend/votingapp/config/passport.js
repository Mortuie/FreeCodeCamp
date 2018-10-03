const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = passport => {

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, cb) => {


    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) return cb(err);

      if (user) return cb(null, false, { message: 'Email already exists, please choose another email.' });

      let newUser = new User();

      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);

      newUser.save(err => {
        if (err) console.log(err);

        return cb(null, newUser);
      })
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, cb) => {
    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) return cb(err);

      if (!user) return cb(null, false, { message: 'Incorrect username.' });

      if (!user.validPassword(password)) return cb(null, false, { message: 'Incorrect password.' });

      return cb(null, user);
    });
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });


};