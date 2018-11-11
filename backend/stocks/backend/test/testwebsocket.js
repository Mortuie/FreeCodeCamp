const wsc = require('websocket').client;
var assert = require('chai').assert;

describe('Websocket server tests', function() {
  let servers;
  let client;
  let clientConn;
  before(async function() {
    servers = await require('../server');
  });

  beforeEach(function(done) {
    client = new wsc();

    client.connect('ws://localhost:3000/');

    client.on('connect', conn => {
      clientConn = conn;
      done();
    });
  });

  it('Testing Default case..', function(done) {
    const expectedOutput = {
      type: 'default',
      error: 'None of the types matched'
    };

    clientConn.send(JSON.stringify({ name: 'leon' }));

    clientConn.on('message', message => {
      assert.deepEqual(
        expectedOutput,
        JSON.parse(message.utf8Data),
        'Should equal a default error'
      );
      done();
    });
  });

  it('Getting all available stocks', function(done) {
    clientConn.send(JSON.stringify({ type: 'getAllStocks' }));

    clientConn.on('message', message => {
      const messageDecoded = JSON.parse(message.utf8Data);

      assert.isObject(messageDecoded, 'Should be a JSON object');

      assert.equal(
        'getAllStocks',
        messageDecoded.type,
        'Types should be equal'
      );

      assert.isArray(
        messageDecoded.stocks,
        'Should contain an array of stocks'
      );

      done();
    });
  });

  it('Adding a stock', function(done) {
    clientConn.send(JSON.stringify({ type: 'addStock' }));

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.isObject(decoded);

      done();
    });
  });

  it('Removing a stock', function(done) {
    clientConn.send(JSON.stringify({ type: 'removeStock', stock: 'APPL' }));

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.isObject(decoded);

      done();
    });
  });

  it('Getting stock info', function(done) {
    clientConn.send(JSON.stringify({ type: 'stockInfo', stock: 'APPL' }));

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.isObject(decoded);

      done();
    });
  });

  afterEach(function(done) {
    clientConn.close();
    done();
  });

  after(function(done) {
    servers.wsserver.shutDown();
    servers.server.close(done);
  });
});
