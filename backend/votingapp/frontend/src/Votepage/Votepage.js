import React, { Component } from 'react';
import axios from 'axios';
import { base } from '../Constants';
import { Pie } from 'react-chartjs-2';
import Option from './Option';
const randomColor = require('random-color');

export default class Votepage extends Component {
  constructor() {
    super();
    this.state = {
      poll: null
    };
  }

  componentWillMount() {
    axios
      .get(base + '/poll/' + this.props.match.params.voteid)
      .then(res => this.setState({ poll: res.data.status }))
      .catch(err => console.log(err));
  }

  updatePoll = poll => {
    this.setState({ poll });
  };

  prepareData(options) {
    const data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }
      ]
    };

    for (var ele in options) {
      const color = randomColor();
      data.labels.push(options[ele].name);
      data.datasets[0].data.push(options[ele].upvotes);
      data.datasets[0].backgroundColor.push(color.hexString());
      data.datasets[0].hoverBackgroundColor.push(color.hexString());
    }

    return data;
  }

  render() {
    if (!this.state.poll) {
      return <div>Loading</div>;
    }
    const { title, options, creator, _id } = this.state.poll;
    const data = this.prepareData(options);
    return (
      <div>
        <div>
          <div>{title}</div>
          <div>{creator}</div>
        </div>
        <Pie data={data} />
        {options.map(option => (
          <Option updatePoll={this.updatePoll} key={option._id} data={option} id={_id} />
        ))}
      </div>
    );
  }
}
