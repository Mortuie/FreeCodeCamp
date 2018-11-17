import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

export default class Linechart extends Component {
  render() {
    const stocks = this.props.stocks.map(point => {
      return {
        ...point,
        data: point.data.map(dataPoint => {
          return {
            x: new Date(dataPoint.date).getTime() / 1000,
            y: dataPoint.closing
          };
        })
      };
    });

    return (
      <div>
        <XYPlot height={600} width={1000}>
          <XAxis
            attr="x"
            attrAxis="y"
            orientation="bottom"
            tickFormat={function tickFormat(d) {
              return new Date(d).toLocaleDateString();
            }}
          />
          <YAxis attr="y" attrAxis="x" orientation="left" />
          {stocks.map(stock => {
            return <LineSeries data={stock.data} />;
          })}
        </XYPlot>
      </div>
    );
  }
}
