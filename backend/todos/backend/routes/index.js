const todosRouter = require('./todos');
const usersRouter = require('./users');

const router = (app, knex) => {
  todosRouter(app, knex);
  usersRouter(app, knex);
};

module.exports = router;
