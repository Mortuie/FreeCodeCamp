const GitHubStrategy = require('passport-github').Strategy;

module.exports = passport => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
      },
      (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ githubId: profile.id }, function(err, user) {
        //   return cb(err, user);
        // });

        return cb(null, 'heyyo');
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    // User.findById(id, function(err, user) {
    //   cb(err, user);
    // });
    cb(null, 'heyyyooo');
  });
};
