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

  app.post('/api/v1/todo', (req, res) => {
    knex('todos')
      .insert({ title: req.body.title, userId: req.body.id })
      .then(ress => {
        console.log(ress);
        res.send('Hello World!');
      })
      .catch(err => {
        console.log(err);
        if (err.code === '23505') {
          return res.json({
            err: true,
            message: 'Duplicate title. Please choose another todo title...'
          });
        } else {
          return res.json({ err: true, message: 'Unknown...' });
        }
      });
  });

  app.patch('/api/v1/todo/:id', (req, res) => {
    console.log('params:', req.params);
    console.log('body:', req.body);

    let updated = { completed: false };

    if (req.body.title) {
      updated.title = req.body.title;
    }

    if (req.body.completed) {
      updated.completed = true;
    }

    console.log(updated);

    knex('todos')
      .where({ id: req.params.id })
      .update(updated)
      .then(ress => {
        console.log(ress);
        return res.json({ status: ress });
      });
  });

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
