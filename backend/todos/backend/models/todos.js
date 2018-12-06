module.exports = knex => {
  return new Promise((resolve, reject) => {
    knex.schema
      .hasTable('todos')
      .then(res => {
        if (!res) {
          knex.schema
            .createTable('todos', table => {
              table.increments('id');
              table
                .string('todo')
                .notNullable()
                .unique();
              table.boolean('completed').notNullable();
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });
};
