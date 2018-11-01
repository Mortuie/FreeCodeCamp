const fs = require('fs');
const neatCsv = require('neat-csv');
const Stock = require('../models').Stock;
const chalk = require('chalk');

const start =  async () => {
  fs.readFile('./seeding/data.csv', async (err, data) => {
    if (err) console.log('Error: ' + err);

    const parsedCsv = await neatCsv(data);

    const csv = parsedCsv.map(data => {
      return {
        code: data.CODE,
        desc: data.DESCRIPTION
      };
    });



    await asyncForEach(csv, async value => {
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
}

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

start();
