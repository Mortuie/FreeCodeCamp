const chalk = require('chalk');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sql'
  }
});

knex
  .raw('SELECT 1 + 1 AS RESULT')
  .then(res => {
    console.log(chalk.green('DB has been connected to.....'));
    module.exports = knex;
  })
  .catch(err => {
    console.log(err);
    process.exit(3);
  });
