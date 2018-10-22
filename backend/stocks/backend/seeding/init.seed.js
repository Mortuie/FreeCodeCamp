const fs = require('fs');
const neatCsv = require('neat-csv');

const seedDb = (seedDataStore, mongoString) => {
  fs.readFile(seedDataStore, async (err, data) => {
    if (err) console.log('Error: ' + err);

    const parsedCsv = await neatCsv(data);

    const res = parsedCsv.map(data => {
      return {
        code: data.CODE,
        desc: data.DESCRIPTION
      };
    });

    console.log(res);
  });
};

module.exports = { seedDb };
