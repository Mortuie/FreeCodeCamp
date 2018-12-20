exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', table => {
    table.increments();
    table.string('name').notNullable();
    table
      .bigInteger('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
