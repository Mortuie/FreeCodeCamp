const Stock = require('../models').Stock;
const axios = require('axios');

module.exports = {
  getAllStocks: async () => {
    try {
      return await Stock.find({ is_active: true });
    } catch (err) {
      throw new Error(err);
    }
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
  },
  stockInfo: async code => {
    const query = `${
      process.env.QUANDL_BASE
    }WIKI/${code}/data.json?rows=100&api_key=${process.env.QUANDL_KEY}`;
    axios
      .get(query)
      .then(res => console.log('hello'))
      // .then(res => console.log(res.data.dataset_data.data))
      .catch(err => console.log(err));
  }
};
