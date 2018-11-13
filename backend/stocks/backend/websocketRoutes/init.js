const routes = require('./routes');

module.exports = (wsserver, redis) => {
  wsserver.on('connect', conn => {
    conn.on('message', async message => {
      const data = JSON.parse(message.utf8Data);
      switch (data.type) {
        case 'getAllStocks':
          console.log('Getting all stocks..');
          try {
            const stocks = await routes.getAllStocks(redis);
            conn.send(
              JSON.stringify({
                type: 'getAllStocks',
                stocks
              })
            );
          } catch (err) {
            conn.send(
              JSON.stringify({
                type: 'error',
                err
              })
            );
          }
          break;
        case 'addStock':
          console.log('Adding stock...');
          try {
            const result = await routes.addStock(data.stock);
            conn.send(
              JSON.stringify({
                type: 'addStock',
                result
              })
            );
          } catch (err) {
            conn.send(JSON.stringify({ type: 'error', err }));
          }
          break;
        case 'removeStock':
          console.log('Removing stock...');
          try {
            const result = await routes.removeStock(data.stock);
            conn.send(
              JSON.stringify({
                type: 'removeStock',
                result
              })
            );
          } catch (err) {
            conn.send(JSON.stringify({ type: 'error', err }));
          }
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
};
