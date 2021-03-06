const HelperFunctions = require('./HelperFunctions');
const { Poll } = require('../models');

module.exports = app => {
  app.get('/poll/getall', (req, res) => {
    Poll.find({}, (err, polls) => {
      if (err) console.log(err);
      res.json({ polls });
    });
  });

  app.get('/poll/user', HelperFunctions.isLoggedIn, (req, res) => {
    Poll.find(
      {
        creator: req.user.id
      },
      (err, polls) => {
        if (err) console.log(err);

        res.json({ polls });
      }
    );
  });

  app.get('/poll/:id', (req, res) => {
    Poll.findById(req.params.id, (err, poll) => {
      if (err) console.log(err);

      res.json({ status: poll, error: '' });
    });
  });

  app.post('/poll', HelperFunctions.isLoggedIn, (req, res) => {
    if (!req.body.title) {
      res.json({ status: '', error: 'No poll title given.' });
    } else {
      let tempPoll = new Poll();

      tempPoll.title = req.body.title;
      tempPoll.creator = req.user.id;
      tempPoll.options = req.body.options;

      tempPoll.save(err => {
        if (err) return res.json({ err });

        return res.json({ status: 'Your poll has been saved.' });
      });
    }
  });

  app.delete('/poll', HelperFunctions.isLoggedIn, (req, res) => {
    if (!req.query.id) {
      return res.json({ status: '', error: 'No poll identifier was given.' });
    } else {
      Poll.findByIdAndRemove(req.query.id, err => {
        if (err) return res.json({ err });
        return res.json({ status: 'Your poll has been deleted.' });
      });
    }
  });

  app.patch('/poll', HelperFunctions.isLoggedIn, (req, res) => {
    console.log(req.body.options);

    if (!req.body.id) {
      return res.json({ status : '', error: 'No poll identifier was given.' });
    } else {
      Poll.findByIdAndUpdate(req.body.id, {
        "$push": { "options" : req.body.options }
      }, (err, poll) => {
        if (err) return res.json({ err });

        console.log(poll);

        return res.json({ status: "Your poll has been updated..." })

      });
    }
  });

  app.post('/poll/upvote', (req, res) => {
    if (!req.body.id) {
      res.json({ status: '', error: 'No poll identifier was given.' });
    } else {
      Poll.findById(req.body.id, (err, poll) => {
        poll.options.map(option => {
          if (option.id === req.body.optionid) option.upvotes++;
        });

        poll.save((err, doc) => {
          let error = '';
          if (err) error = err;

          res.json({ status: !error ? doc : '', error });
        });
      });
    }
  });

  app.post('/poll/downvote', (req, res) => {
    if (!req.body.id) {
      res.json({ status: '', error: 'No poll identifier was given.' });
    } else {
      Poll.findById(req.body.id, (err, poll) => {
        poll.options.map(option => {
          if (option.id === req.body.optionid) option.downvotes--;
        });

        poll.save(err => {
          let error = '';
          if (err) error = err;

          res.json({ status: !error ? 'Downvoted.' : '', error });
        });
      });
    }
  });
};
