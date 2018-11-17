import React, { Component } from 'react';

class App extends Component {
  state = {
    stocks: [],
    code: '',
    availableStocks: []
  };

  componentWillMount = () => {
    this.ws = new WebSocket('ws://localhost:3001/');

    this.ws.onopen = event => {
      this.ws.send(JSON.stringify({ type: 'getAllStocks' }));
    };

    this.ws.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log('Um message recieved: ', data);

      switch (data.type) {
        case 'getAllStocks':
          const names = data.stocks.map(s => s.code);
          this.setState({ stocks: data.stocks, availableStocks: names });
          break;
        case 'addStock':
          this.setState({ stocks: data.stocks, availableStocks: names });
          break;
        default:
          break;
      }
    };
  };

  handleChange = e => {
    this.setState({ code: e.target.value });
  };

  addStock = () => {
    this.ws.send(JSON.stringify({ type: 'addStock', stock: this.state.code }));
  };

  removeStock = () => {};

  render() {
    const readyState = this.ws.readyState;

    if (!readyState) {
      return <div>Loading...</div>;
    }

    console.log(this.state.stocks);

    return (
      <div>
        <input
          value={this.state.code}
          placeholder={'AAPL'}
          onChange={this.handleChange}
        />
        <button onClick={this.addStock}>Add stock</button>
      </div>
    );
  }
}

export default App;
