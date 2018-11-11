const chalk = require('chalk');
const express = require('express');
const app = express();
const websocketserver = require('websocket').server;
const db = require('./init');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.init();
    console.log(chalk.green('Connected to the Database'));
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

  wsserver.on('connect', conn => {
    console.log('Client has connected: ', conn.remoteAddress);

    conn.on('message', message => {
      const data = JSON.parse(message.utf8Data);
      switch (data.type) {
        case 'getAllStocks':
          console.log('Getting all stocks..');
          break;
        case 'addStock':
          console.log('Adding stock...');
          break;
        case 'removeStock':
          console.log('Removing stock...');
          break;
        case 'stockInfo':
          console.log('Getting stock info...');
          break;
        default:
          console.log('This is the default case..');
          conn.send(
            JSON.stringify({
              type: 'default',
              error: 'None of the types matched'
            })
          );
          break;
      }
    });
  });

  wsserver.on('close', (conn, reason, desc) => {
    console.log('Client has disconnected: ', conn.remoteAddress);
  });
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
