import React, { Component } from 'react';

export default class StockList extends Component {
  removeStock = code => {
    if (window.confirm(`Do you want to remove the stock ${code}`)) {
      this.props.removeStock(code);
    }
  };

  render() {
    return (
      <div>
        {this.props.stockList.map(s => {
          return (
            <div key={s} onClick={() => this.removeStock(s)}>
              {s}
            </div>
          );
        })}
      </div>
    );
  }
}
