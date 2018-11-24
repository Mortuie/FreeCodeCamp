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
        const places = response.data.businesses;

        const goingPlaces = Promise.all(
          places.map(p => {
            return new Promise((resolve, reject) => {
              redis.get(p.id, (err, redisres) => {
                if (err) {
                  // console.log(err);
                  return reject(err);
                }

                if (!redisres) {
                  // console.log(p);
                  return resolve({ ...p, going: 0, me: false });
                }

                // MIv9RY9k2MjWo-bWgwJe-g
                console.log('dis:', redisres);
                console.log('id:');
                const array = JSON.parse(redisres);
                return resolve({ ...p, going: array.length, me: false });
              });
            });
          })
        );

        goingPlaces.then(places => res.json({ places }));
      })
      .catch(err => console.log(err));
  });

  app.post('/api/v1/going', (req, res) => {
    const userid = 123; // req.user.id;
    const eventid = req.body.id;
    console.log(req.body);

    redis.get(eventid, (err, redisres) => {
      if (err) return res.json({ err });

      if (!redisres) {
        // no result found i.e. first one so set it..
        redis.set(eventid, JSON.stringify([userid]), (err, redissetres) => {
          if (err) return res.json({ err });
          console.log(redissetres);
          return res.json({ redissetres });
        });
      } else {
        // already been set.
        const oldArray = JSON.parse(redisres);

        oldArray.push(userid);

        redis.set(eventid, JSON.stringify(oldArray), (err, redissetsetres) => {
          if (err) return res.json({ err });

          console.log(redissetsetres);

          return res.json({ redissetsetres });
        });
      }
    });
  });

  app.delete('/api/v1/going', (req, res) => {
    const userid = 123; // req.user.id;
    const eventid = req.body.id;
    console.log(req.body);

    redis.get(eventid, (err, redisres) => {
      if (err) return res.json({ redisres });

      if (!redisres) {
        // not set...
      } else {
        const array = JSON.parse(redisres);

        // TODO: remove from array and put back into redis.......
      }
    });

    res.send('Hello World');
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
        res.redirect('http://127.0.0.1:3001/twitter/login');
      });
    }
  );

  app.get('/api/v1/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  function isAuthenticated(req, res, next) {
    if (req.user.authenticated) return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
  }
};
