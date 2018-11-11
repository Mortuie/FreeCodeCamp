const Stock = require('../models').Stock;

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
  }
};
