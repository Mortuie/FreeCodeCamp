module.exports = (app, knex) => {
  app.get('/api/v1/todo/:id', (req, res) => {
    knex
      .from('todos')
      .select('*')
      .where({ id: req.params.id })
      .then(rows => {
        console.log(rows);
        res.json(rows[0]);
      });
  });

  app.get('/api/v1/todos', (req, res) => {
    knex
      .from('todos')
      .select('*')
      .then(rows => {
        console.log(rows);
        res.json(rows);
      });
  });

  app.post('/api/v1/todo', (req, res) => {});

  app.patch('/api/v1/todo/:id', (req, res) => {});

  app.delete('/api/v1/todo/:id', (req, res) => {
    knex
      .from('todos')
      .where({ id: req.params.id })
      .del()
      .then(ress => {
        console.log(ress);
        res.json({ answer: ress });
      });
  });
};
