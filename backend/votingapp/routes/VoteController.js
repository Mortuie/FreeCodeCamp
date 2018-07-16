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
    Poll.find({
      creator: req.user.id,
    }, (err, polls) => {
      if (err) console.log(err);

      res.json({polls});
    })
  });



};