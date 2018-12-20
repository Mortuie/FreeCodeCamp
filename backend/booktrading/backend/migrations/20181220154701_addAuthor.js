exports.up = function(knex, Promise) {
  return knex.schema.table('books', table => {
    table
      .string('author')
      .notNullable()
      .default('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('books', table => {
    table.dropColumn('author');
  });
};
