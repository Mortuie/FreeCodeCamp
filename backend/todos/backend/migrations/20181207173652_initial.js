exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('name').unique();
    }),
    knex.schema.createTable('todos', table => {
      table.increments('id');
      table.string('title').unique();
      table.boolean('completed').default(false);
      table
        .integer('userId')
        .unsigned()
        .index()
        .references('id')
        .inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('todos')
  ]);
};
