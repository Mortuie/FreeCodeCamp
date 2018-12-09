const todosRouter = require('./todos');

const router = (app, knex) => {
  todosRouter(app, knex);
};

module.exports = router;
