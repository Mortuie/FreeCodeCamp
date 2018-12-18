const userRoutes = require('./user');

module.exports = (app, knex, passport) => {
  userRoutes(app, knex, passport);
};
