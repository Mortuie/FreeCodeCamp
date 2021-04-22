import passport from "passport";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});
