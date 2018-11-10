const websocketclient = require('websocket').client;


const client = new websocketclient();


client.on('connectFailed', err => {
  console.log(err);
});

client.on('connect', conn => {
  console.log("CONNECTED");

  conn.on('message', message => {
    console.log('Got: ' + message.utf8Data);

  });

  conn.sendUTF(JSON.stringify({name: "leon"}));
});


client.connect('ws://localhost:3000/', null);
