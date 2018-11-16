const ws = require('ws');
const assert = require('chai').assert;

describe('Websocket server tests', function() {
  let servers;
  let client;
  let client2;

  before(async function() {
    servers = await require('../server');
  });

  beforeEach(function(done) {
    client = new ws('ws://localhost:3001/');
    client2 = new ws('ws://localhost:3001/');

    client.on('open', () => {
      client2.on('open', () => {
        done();
      });
    });

    client2.on('open', () => {
      client.on('open', () => {
        done();
      });
    });
  });

  it('Testing Default case', function(done) {
    var triggered = false;
    const expectedOutput = {
      type: 'default',
      error: 'None of the types matched'
    };

    client.send(JSON.stringify({ name: 'leon' }));

    client.on('message', message => {
      assert.deepEqual(
        expectedOutput,
        JSON.parse(message),
        'Should equal a default error'
      );
      if (!triggered) done();
      triggered = true;
    });
  });

  it('Getting all available stocks', function(done) {
    this.timeout(0);
    client.send(JSON.stringify({ type: 'getAllStocks' }));

    client.on('message', message => {
      const messageDecoded = JSON.parse(message);

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
    client.send(JSON.stringify({ type: 'addStock', stock: 'CMG' }));
    const stringResult = `Stock CMG has been added`;

    client.on('message', message => {
      const decoded = JSON.parse(message);

      assert.isObject(decoded);
      assert.isString(decoded.result);
      assert.equal(stringResult, decoded.result);
      assert.equal('addStock', decoded.type, 'Types are not the same!?!');

      done();
    });
  });

  it('Adding a stock error', function(done) {
    client.send(JSON.stringify({ type: 'addStock', stock: 'xxxx' }));

    client.on('message', message => {
      const decoded = JSON.parse(message);

      assert.equal('error', decoded.type, 'Types are not equal!?!');

      done();
    });
  });

  it('Removing a stock', function(done) {
    client.send(JSON.stringify({ type: 'removeStock', stock: 'CMG' }));
    const stringResult = `Stock CMG has been removed`;

    client.on('message', message => {
      const decoded = JSON.parse(message);

      assert.isObject(decoded);
      assert.isString(decoded.result);
      assert.equal(stringResult, decoded.result);
      assert.equal('removeStock', decoded.type, 'Types are not the same!?!');

      done();
    });
  });

  it('Removing a stock with falsy code.', function(done) {
    client.send(JSON.stringify({ type: 'removeStock', stock: 'xxxx' }));

    client.on('message', message => {
      const decoded = JSON.parse(message);

      assert.equal('error', decoded.type, 'Types are not equal!?!');

      done();
    });
  });

  afterEach(function(done) {
    this.timeout(2000);
    client.close();
    client2.close();
    done();
  });

  after(function(done) {
    servers.wss.close();
    servers.server.close();
    servers.redis.quit();
    done();
  });
});
