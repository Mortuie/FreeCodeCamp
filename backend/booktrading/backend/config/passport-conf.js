const GitHubStrategy = require('passport-github').Strategy;

module.exports = (passport, knex) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
      },
      (accessToken, refreshToken, profile, cb) => {
        knex
          .from('users')
          .select('*')
          .where({ githubid: profile.id })
          .then(rows => {
            if (rows.length) {
              return cb(null, rows[0]);
            }

            knex('users')
              .insert({
                name: profile.username,
                githubid: profile.id
              })
              .then(res => {
                return cb(null, {
                  name: profile.username,
                  githubid: profile.id
                });
              });
          })
          .catch(err => console.log('Err from pass-conf: ', err));
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.githubid);
  });

  passport.deserializeUser(function(id, cb) {
    knex
      .from('users')
      .select('*')
      .where({ githubid: id })
      .then(rows => {
        cb(null, rows[0]);
      })
      .catch(err => console.log('Err from pass-conf: ', err));
  });
};
