const wsc = require('websocket').client;
const assert = require('chai').assert;

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
    this.timeout(0);
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
    clientConn.send(JSON.stringify({ type: 'addStock', stock: 'CMG' }));
    const stringResult = `Stock CMG has been added`;

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.isObject(decoded);
      assert.isString(decoded.result);
      assert.equal(stringResult, decoded.result);
      assert.equal('addStock', decoded.type, 'Types are not the same!?!');

      done();
    });
  });

  it('Adding a stock error', function(done) {
    clientConn.send(JSON.stringify({ type: 'addStock', stock: 'xxxx' }));

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.equal('error', decoded.type, 'Types are not equal!?!');

      done();
    });
  });

  it('Removing a stock', function(done) {
    clientConn.send(JSON.stringify({ type: 'removeStock', stock: 'CMG' }));
    const stringResult = `Stock CMG has been removed`;

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.isObject(decoded);
      assert.isString(decoded.result);
      assert.equal(stringResult, decoded.result);
      assert.equal('removeStock', decoded.type, 'Types are not the same!?!');

      done();
    });
  });

  it('Removing a stock with falsy code.', function(done) {
    clientConn.send(JSON.stringify({ type: 'removeStock', stock: 'xxxx' }));

    clientConn.on('message', message => {
      const decoded = JSON.parse(message.utf8Data);

      assert.equal('error', decoded.type, 'Types are not equal!?!');

      done();
    });
  });

  afterEach(function(done) {
    this.timeout(2000);
    clientConn.close();
    done();
  });

  after(function(done) {
    servers.wsserver.shutDown();
    servers.server.close();
    servers.redis.quit();
    done();
  });
});
