const userRoutes = require('./users');
const bookRoutes = require('./books');

module.exports = (app, knex, passport) => {
  userRoutes(app, knex, passport);
  bookRoutes(app, knex, passport);
};
