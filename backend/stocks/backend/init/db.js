const mongo = require('mongoose');

exports.initialiseDB = () => {
  return new Promise((resolve, reject) => {
    mongo
      .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true }
      )
      .then(() => resolve('Mongodb has been connected to.'))
      .catch(err => reject(err));
  });
};
