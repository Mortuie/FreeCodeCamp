const express = require('express');
const app = express();
const routes = require('./apiRoutes');
let server;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 11000;

process.on('SIGINT', () => {
  server.close(() => console.log('Closed express server.'));
});

process.on('exit', () => {
  server.close(() => console.log('Closed express server.'));
});

async function initServer() {
  server = app.listen(PORT, () => {
    console.log('Listening on:', PORT);

    routes.apiRoutes(app);

    return { server };
  });
}

module.exports = (async () => {
  try {
    return await initServer();
  } catch (err) {
    console.log(err);
  }
})();
