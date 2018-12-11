module.exports = (app, knex) => {
  app.post('/api/v1/user/:username', (req, res) => {
    knex('users')
      .insert({ name: req.params.username })
      .then(ress => {
        knex
          .from('users')
          .select('*')
          .where({ name: req.params.username })
          .then(resss => {
            return res.json(resss);
          });
      })
      .catch(err => {
        console.log(err);
        if (err.code === '23505') {
          // already exists.
          return res.json({
            error: true,
            code: 1,
            status: 'Name has already  been taken.'
          });
        } else {
          return res.json({ error: true, status: 'Unknown Error' });
        }
      });
  });
};
