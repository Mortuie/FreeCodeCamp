const express = require('express');
const app = express();
const redis = require('redis');
const chalk = require('chalk');
const passport = require('passport');
const cors = require('cors');
const TwitterStrategy = require('passport-twitter').Strategy;
const routes = require('./apiRoutes');
let server;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 11000;

process.on('SIGINT', () => {
  server.close(() => console.log('Closed express server.'));
});

process.on('exit', () => {
  server.close(() => console.log('Closed express server.'));
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API,
      consumerSecret: process.env.TWITTER_API_SECRET,
      callbackURL: 'http://127.0.0.1:3000/api/v1/twitter'
    },
    (token, tokenSecret, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());
var corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true
};
app.use(cors(corsOptions));

async function initRedis() {
  try {
    const redisConn = await redis.createClient();
    console.log(chalk.green('Redis Connected'));
    return redisConn;
  } catch (err) {
    console.log(err);
    process.exit(5);
  }
}

async function initServer(redisConn) {
  server = app.listen(PORT, () => {
    console.log(chalk.green('Listening on:', PORT));

    routes.apiRoutes(app, redisConn);

    return { server };
  });
}

module.exports = (async () => {
  try {
    const redisConn = await initRedis();
    const express = await initServer(redisConn);
    return { express, redisConn };
  } catch (err) {
    console.log(err);
  }
})();
