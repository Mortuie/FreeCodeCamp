const routes = require('./routes');
const ws = require('ws');

module.exports = (wss, redis) => {
  wss.on('connection', conn => {
    conn.on('message', async message => {
      const data = JSON.parse(message);
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

            wss.clients.forEach(client => {
              if (client.readyState === ws.OPEN) {
                client.send(
                  JSON.stringify({
                    type: 'addStock',
                    result
                  })
                );
              }
            });
          } catch (err) {
            conn.send(JSON.stringify({ type: 'error', err }));
          }
          break;
        case 'removeStock':
          console.log('Removing stock...');
          try {
            const result = await routes.removeStock(data.stock);
            wss.clients.forEach(client => {
              if (client.readyState === ws.OPEN) {
                client.send(
                  JSON.stringify({
                    type: 'removeStock',
                    result
                  })
                );
              }
            });
          } catch (err) {
            conn.send(JSON.stringify({ type: 'error', err }));
          }
          break;
        default:
          console.log('This is the default case..');
          wss.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
              client.send(
                JSON.stringify({
                  type: 'default',
                  error: 'None of the types matched'
                })
              );
            }
          });
          break;
      }
    });
  });

  wss.on('close', xd => {
    console.log('Client has disconnected');
    console.log(xd);
  });
};
