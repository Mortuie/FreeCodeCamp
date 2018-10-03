import React, { Component } from 'react';
import axios from 'axios';
import PollContainer from './PollContainer';
import { BASE } from '../Constants';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      polls: []
    };
  }

  componentWillMount() {
    axios
      .get(BASE + '/poll/getall')
      .then(res => this.setState({ polls: res.data.polls }))
      .catch(err => console.warn(err));
  }

  render() {
    return <PollContainer polls={this.state.polls} />;
  }
}

export default Homepage;
