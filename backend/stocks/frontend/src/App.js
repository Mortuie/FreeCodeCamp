import React, { Component } from 'react';
import StockList from './StockList';
import Linechart from './Linechart';

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
      let names;
      switch (data.type) {
        case 'getAllStocks':
          names = data.stocks.map(s => s.code);
          this.setState({ stocks: data.stocks, availableStocks: names });
          break;
        case 'addStock':
          names = data.stocks.map(s => s.code);
          this.setState({
            stocks: data.stocks,
            availableStocks: names,
            code: ''
          });
          break;
        case 'removeStock':
          names = data.stocks.map(s => s.code);
          this.setState({ stocks: data.stocks, availableStocks: names });
          break;
        case 'error':
          console.log(data);
          break;
        default:
          console.log('Default triggered', data);
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

  removeStock = code => {
    console.log(code);
    this.ws.send(JSON.stringify({ type: 'removeStock', stock: code }));
  };

  keyPress = e => {
    if (e.key === 'Enter') {
      this.addStock();
    }
  };

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
          onKeyPress={this.keyPress}
        />
        <button onClick={this.addStock}>Add stock</button>
        <StockList
          stockList={this.state.availableStocks}
          removeStock={this.removeStock}
        />
        <Linechart stocks={this.state.stocks} />
      </div>
    );
  }
}

export default App;
