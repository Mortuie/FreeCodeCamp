import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

export default class Linechart extends Component {
  render() {
    const stocks = this.props.stocks.map(point => {
      return {
        ...point,
        data: point.data.map(dataPoint => {
          return {
            x: new Date(dataPoint.date).getTime(),
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
            tickTotal={10}
            title="Date"
          />
          <YAxis attr="y" attrAxis="x" orientation="left" title="Closing" />
          {stocks.map(stock => {
            return <LineSeries key={stock.code} data={stock.data} />;
          })}
        </XYPlot>
      </div>
    );
  }
}
