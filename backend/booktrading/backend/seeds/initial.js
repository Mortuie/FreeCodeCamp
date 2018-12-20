exports.seed = function(knex, Promise) {
  return knex('books')
    .del()
    .then(() => {
      return knex('users')
        .del()
        .then(() => {
          return knex('users')
            .insert([
              { name: 'Leon', githubId: 2 },
              { name: 'Bob', githubId: 1 }
            ])
            .then(() => {
              return knex('users')
                .select('*')
                .where({ name: 'Leon' })
                .then(rows => {
                  return knex('books').insert([
                    {
                      name: 'Catcher in the Rye',
                      userId: rows[0]['id'],
                      author: 'JD Salinger'
                    },
                    {
                      name: '1984',
                      userId: rows[0]['id'],
                      author: 'George Orwell'
                    }
                  ]);
                });
            });
        });
    });
};
