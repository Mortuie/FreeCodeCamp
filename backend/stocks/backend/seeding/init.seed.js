const fs = require('fs');
const neatCsv = require('neat-csv');
const Stock = require('../models').Stock;
const chalk = require('chalk');

const seedDb = seedDataStore => {
  fs.readFile(seedDataStore, async (err, data) => {
    if (err) console.log('Error: ' + err);

    const parsedCsv = await neatCsv(data);

    const csv = parsedCsv.map(data => {
      return {
        code: data.CODE,
        desc: data.DESCRIPTION
      };
    });

    await csv.forEach(async value => {
      const temp = new Stock({
        code: value.code,
        description: value.desc
      });

      try {
        let tempStock = await temp.save();
        console.log(chalk.green('Saved!'));
      } catch (err) {
        console.log(err);
      }
    });
  });
};

seedDb('./seeding/data.csv');
