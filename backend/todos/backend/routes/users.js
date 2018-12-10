module.exports = (app, knex) => {
  app.post('/api/v1/user/:username', (req, res) => {
    knex('users')
      .insert({ name: req.params.username })
      .then(ress => {
        console.log(ress);
        return res.json(ress);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  });

  app.get('/api/v1/user', (req, res) => {});
};
