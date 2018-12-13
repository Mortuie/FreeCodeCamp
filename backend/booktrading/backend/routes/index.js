const userRoutes = require('./user');

module.exports = (app, knex) => {
  userRoutes(app, knex);
};
