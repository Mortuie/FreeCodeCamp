const wsc = require('websocket').client;
const servers = require('../server');

describe('Websocket server tests', function() {
  it('xd', function() {
    const client = new wsc();

    client.connect('ws://localhost:3000/');

    client.on('connect', conn => {
      console.log('Connected!!');

      conn.on('message', message => {
        console.log('Got: ' + message.utf8Data);
      });

      conn.sendUTF(JSON.stringify({ name: 'leon' }));
    });
  });

  after(function(done) {
    servers.wsserver.shutDown();
    servers.server.close();
    done();
  });
});
