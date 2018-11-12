const redis = require('redis');

module.exports = async () => {
  return await redis.createClient();
};
