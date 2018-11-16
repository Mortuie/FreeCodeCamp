import React, { Component } from 'react';

class App extends Component {
  componentWillMount() {
    this.ws = new WebSocket('ws://localhost:3001/');

    this.ws.onopen = event => {
      console.log('WS open...');
      this.ws.send(JSON.stringify({ xd: '12' }));
    };

    this.ws.onmessage = event => {
      console.log('Um message recieved: ', event);
    };
  }

  render() {
    return <div />;
  }
}

export default App;
