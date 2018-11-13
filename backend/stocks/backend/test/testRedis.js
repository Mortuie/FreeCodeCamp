const redis = require('redis');
const chalk = require('chalk');
const assert = require('chai').assert;
const redisFunctions = require('../redis/functions');

describe('Redis client tests', function() {
  describe('Setting and Getting properly with expiry & ttl', function() {
    let redisClient;
    before(async function() {
      redisClient = await redis.createClient();
      console.log(chalk.green('Connected to Redis Client'));
    });

    it('Testing getting an invalid/non set code', function(done) {
      redisFunctions
        .getStock(redisClient, 'xxxx')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          if (err === "Data hasn't been set") {
            done();
          }
        });
    });

    it('Testing setting an element', function(done) {
      redisFunctions
        .setStock(redisClient, 'TEST', 'asdasdasd')
        .then(res => {
          assert.isString(res);
          if (res === 'OK') {
            done();
          }
        })
        .catch(err => console.log(err));
    });

    it('Testing set/get to see if that works', function(done) {
      redisFunctions
        .setStock(redisClient, 'SETITNOW', 'TOTHISDATA')
        .then(res => {
          assert.isString(res);
          if (res === 'OK') {
            redisFunctions
              .getStock(redisClient, 'SETITNOW')
              .then(res => {
                assert.isString(res);
                assert.equal(res, 'TOTHISDATA', 'Res and answer are not equal');
                redisClient.ttl('SETITNOW', (err, data) => {
                  assert.isNumber(data);
                  if (data > 86000) {
                    done();
                  }
                });
              })
              .catch(err => console.log(err));
          }
        });
    });

    after(async function() {
      await redisClient.quit();
      console.log(chalk.green('Closed the Redis Client'));
    });
  });
});
