module.exports = {
  getStock: (redis, stock) => {
    return new Promise((resolve, reject) => {
      redis.get(stock, (err, data) => {
        if (err) reject(err);
        if (!data) {
          reject("Data hasn't been set");
        } else {
          resolve(data);
        }
      });
    });
  },
  setStock: (redis, stock, data) => {
    return new Promise((resolve, reject) => {
      redis.set(stock, data, 'EX', 86400, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
};
