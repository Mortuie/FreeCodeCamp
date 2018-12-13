exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('password').notNullable();
  });
};
