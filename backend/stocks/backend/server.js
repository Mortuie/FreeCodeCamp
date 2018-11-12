const chalk = require('chalk');
const express = require('express');
const app = express();
const websocketserver = require('websocket').server;
const db = require('./init');
const ws = require('./websocketRoutes').wsInit;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

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
  const wsserver = new websocketserver({
    httpServer: server,
    autoAcceptConnections: true
  });

  ws(wsserver);

  return { server, wsserver };
}

module.exports = (async () => {
  try {
    await start();
    const res = await initServers();
    return res;
  } catch (err) {
    console.log(err);
  }
})();
