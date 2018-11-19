import React, { Component } from 'react';
import StockList from './StockList';
import Linechart from './Linechart';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    stocks: [],
    code: '',
    availableStocks: [],
    snackbar: false,
    snackbarContent: 'ASDASDASDD',
    snackbarClose: 2500
  };

  componentWillMount = () => {
    this.ws = new WebSocket('ws://localhost:3001/');

    this.ws.onopen = event => {
      this.ws.send(JSON.stringify({ type: 'getAllStocks' }));
    };

    this.ws.onmessage = event => {
      const data = JSON.parse(event.data);
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
            code: '',
            snackbar: true,
            snackbarContent: data.result
          });
          break;
        case 'removeStock':
          names = data.stocks.map(s => s.code);
          this.setState({
            stocks: data.stocks,
            availableStocks: names,
            snackbar: true,
            snackbarContent: data.result
          });
          break;
        case 'error':
          console.error(data);
          break;
        default:
          console.warn('Default triggered', data);
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
    this.ws.send(JSON.stringify({ type: 'removeStock', stock: code }));
  };

  keyPress = e => {
    if (e.key === 'Enter') {
      this.addStock();
    }
  };

  closeSnackbar = () => {
    this.setState({ snackbar: false });
  };

  render() {
    const readyState = this.ws.readyState;

    if (!readyState) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Graph>
          <Linechart stocks={this.state.stocks} />
        </Graph>
        <AddStock>
          <TextField
            id="code"
            label="Stock Code"
            value={this.state.code}
            onChange={this.handleChange}
            onKeyPress={this.keyPress}
          />
          <Button color="primary" onClick={this.addStock}>
            Add Stock
          </Button>
        </AddStock>
        <StockList
          stockList={this.state.availableStocks}
          removeStock={this.removeStock}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snackbar}
          autoHideDuration={this.state.snackbarClose}
          onClose={this.closeSnackbar}
          message={<span>{this.state.snackbarContent}</span>}
        />
      </div>
    );
  }
}

const Graph = styled.div`
  margin-top: 10px;
`;

const AddStock = styled.div`
  margin: auto;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export default App;
