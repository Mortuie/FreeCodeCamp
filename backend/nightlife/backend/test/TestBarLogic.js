const axios = require('axios');
const assert = require('chai').assert;
let servers;

describe('Testing the first user story', function() {
  before(function(done) {
    servers = require('../server');
    done();
  });

  it('Getting all the places around Bath', function(done) {
    axios
      .get('http://localhost:3000/places', {
        params: {
          latitude: 51.3751,
          longitude: -2.36172
        }
      })
      .then(res => {
        const data = res.data;

        assert.isObject(data, 'Data returned is not an object');
        assert.isArray(data.places, 'Places is not an array');

        done();
      })
      .catch(err => {
        done(new Error(err.message));
      });
  });
});
