const initialise = require('./init');
const chalk = require('chalk');
const express = require('express');
const app = express();
const websocketserver = require('websocket').server;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => console.log("Listening on port: ", PORT));


const wsserver = new websocketserver({
  httpServer: server,
  autoAcceptConnections: true
});


wsserver.on('connect', conn => {
  console.log("CONNECTED...");


  conn.on('message', message => {
    console.log("Received: " + message.utf8Data);
    conn.sendUTF(message.utf8Data);
  });
});


wsserver.on('close', (conn, reason, desc) => {
  console.log('CLOSED');
});


module.exports = {
  wsserver,
  server
};
