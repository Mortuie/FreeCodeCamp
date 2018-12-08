exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => {
      return knex('users')
        .insert([{ name: 'Leon' }, { name: 'Bob' }, { name: 'Chelsea' }])
        .then(() => {
          return knex('todos')
            .del()
            .then(() => {
              return knex
                .from('users')
                .select('id')
                .where({ name: 'Leon' })
                .then(rows => {
                  console.log('HERE: ', rows);
                  console.log(rows[0].id);
                  return knex('todos').insert([
                    {
                      title: 'Clean kitchen',
                      userId: rows[0].id
                    },
                    {
                      title: 'Go Shopping',
                      userId: rows[0].id
                    },
                    { title: 'Find shoes', userId: rows[0].id }
                  ]);
                });
            });
        });
    });
};
