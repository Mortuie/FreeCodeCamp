const Stock = require('../models').Stock;
const axios = require('axios');
const chalk = require('chalk');
const redisFunctions = require('../redis/functions');

const stockInfo = (code, redis) => {
  return new Promise((resolve, reject) => {
    redisFunctions
      .getStock(redis, code)
      .then(res => {
        resolve(JSON.parse(res));
      })
      .catch(err => {
        if (err === "Data hasn't been set") {
          const query = `${
            process.env.QUANDL_BASE
          }WIKI/${code}/data.json?rows=100&api_key=${process.env.QUANDL_KEY}`;
          axios
            .get(query)
            .then(res => {
              const data = res.data.dataset_data.data;
              const dataClose = data.map(d => {
                return { date: d[0], closing: d[4] };
              });
              redisFunctions
                .setStock(redis, code, JSON.stringify(dataClose))
                .then(res => {
                  if (res === 'OK') {
                    resolve(dataClose);
                  }
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => reject(err));
        } else {
          reject(err);
        }
      });
  });
};

module.exports = {
  getAllStocks: redis => {
    return new Promise(async (resolve, reject) => {
      let result = await Stock.find({ is_active: true });

      const arr = result.map(r => {
        return stockInfo(r.code, redis)
          .then(res => {
            const ress = JSON.parse(JSON.stringify(r));
            ress.data = res;
            return ress;
          })
          .catch(err => {
            throw new Error(err);
          });
      });
      Promise.all(arr)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  addStock: async code => {
    try {
      const result = await Stock.findOneAndUpdate(
        { code },
        { is_active: true }
      );
      if (!result) {
        throw new Error(`Stock ${code} doesn't exist.`);
      }
      return `Stock ${code} has been added`;
    } catch (err) {
      throw new Error(err);
    }
  },
  removeStock: async code => {
    try {
      const result = await Stock.findOneAndUpdate(
        { code },
        { is_active: false }
      );
      if (!result) {
        throw new Error(`Stock ${code} doesn't exist.`);
      }
      return `Stock ${code} has been removed`;
    } catch (err) {
      throw new Error(err);
    }
  }
};
