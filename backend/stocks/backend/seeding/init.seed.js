const fs = require('fs');
const Stock = require('../models').Stock;
const chalk = require('chalk');
const db = require('../init');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

async function start() {
  try {
    await db.init();
    console.log(chalk.green('Connected to the Database.'));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function stop() {
  try {
    await db.close();
    console.log(chalk.green('Disconnected from the Database'));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function readCsv() {
  let rows;
  fs.readFile('./seeding/data.csv', 'utf8', async (err, data) => {
    if (err) {
      console.log(err);
      await stop();
      process.exit(1);
    }

    rows = data.split('\n');
    rows = rows.map(row => {
      const tempRow = row.split(',');
      const code = tempRow[0].replace('WIKI/', '');
      const desc = tempRow[1].replace('"', '');

      return { code, desc };
    });
    const resArray = rows.map(async row => {
      const tempStock = new Stock(row);

      return await tempStock.save();
    });

    try {
      const r = await Promise.all(resArray);
      console.log(r);
      await stop();
    } catch (err) {
      if (err.code === 11000) {
        console.log(chalk.green('Database has already been seeded.'));
        await stop();
        process.exit(0);
      }
      console.log(err);
    }
  });
}

async function main() {
  try {
    await start();
    await readCsv();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  await stop();
  process.exit(1);
});

main();
