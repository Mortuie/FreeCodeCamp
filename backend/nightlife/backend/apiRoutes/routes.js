const axios = require('axios');

module.exports = app => {
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
};
