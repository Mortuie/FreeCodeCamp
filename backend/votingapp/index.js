var express = require('express');
var app = express();
var chalk = require('chalk');
var port = process.env.PORT || 3000;
const Controllers = require('./routes');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

config.db.init();
config.passportConfig(passport);

Controllers.PollController(app);
Controllers.UserController(app, passport);

app.listen(port, () => {
  console.log(chalk.green('Server running: Listening on port: ' + port));
});
