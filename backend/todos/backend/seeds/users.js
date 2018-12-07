exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        { name: 'Leon' },
        { name: 'Bob' },
        { name: 'Chelsea' }
      ]);
    });
};
