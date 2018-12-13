exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments();
      table
        .string('name')
        .unique()
        .notNullable();
      table
        .string('githubid')
        .unique()
        .default(null);
      table.string('password').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users');
};
