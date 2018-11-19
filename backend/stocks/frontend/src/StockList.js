import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

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
            <div>
              <StyledPaper key={s} onClick={() => this.removeStock(s)}>
                <Typography variant="h4">{s}</Typography>
              </StyledPaper>
            </div>
          );
        })}
      </div>
    );
  }
}

const StyledPaper = styled(Paper)`
  cursor: pointer;
  width: 110px;
`;
