const userRoutes = require('./users');

module.exports = (app, knex, passport) => {
  userRoutes(app, knex, passport);
};
