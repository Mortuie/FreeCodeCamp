const axios = require('axios');
const passport = require('passport');
const _ = require('lodash');

module.exports = (app, redis) => {
  app.get('/places', (req, res) => {
    axios
      .get('https://api.yelp.com/v3/businesses/search', {
        params: {
          latitude: req.query.latitude,
          longitude: req.query.longitude,
          term: 'nightlife'
        },
        headers: { Authorization: 'bearer ' + process.env.API_KEY }
      })
      .then(response => {
        console.log(response.data.businesses[0].location);
        res.json({ places: response.data.businesses });
      })
      .catch(err => console.log(err));
  });

  app.get(
    '/api/v1/login/twitter',
    (req, res, next) => {
      const queryString = JSON.stringify(req.query);
      const unique = _.uniqueId('req_');

      redis.set(unique, queryString, 'EX', 120, redis.print);

      req.session.state = unique;
      next();
    },
    passport.authenticate('twitter')
  );

  app.get(
    '/api/v1/twitter',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      redis.get(req.session.state, (err, ress) => {
        req.session.state = null;
        const qs = JSON.parse(ress);

        console.log('userid: ', req.user.id);
        console.log('querystring: ', qs);

        redis.HMSET(req.user.id, qs);

        // res.send('hello world!');
        res.redirect('http://127.0.0.1:3001/huehuehue');
      });
    }
  );

  app.get('/api/v1/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
