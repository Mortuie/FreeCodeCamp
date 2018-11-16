const chalk = require('chalk');
const express = require('express');
const app = express();
const db = require('./init');
const websocket = require('./websocketRoutes').wsInit;
const ws = require('ws');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3001;

let redis;

async function start() {
  try {
    await db.mongodb.init();
    console.log(chalk.green('Connected to the MongoDB'));
    redis = await db.redis();
    console.log(chalk.green('Redis connected'));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function initServers() {
  const server = app.listen(PORT, () =>
    console.log('Listening on port: ', PORT)
  );

  const wss = new ws.Server({ server });

  websocket(wss, redis);
  return { server, wss, redis };
}

module.exports = (async () => {
  try {
    await start();
    return await initServers();
  } catch (err) {
    console.log(err);
  }
})();
