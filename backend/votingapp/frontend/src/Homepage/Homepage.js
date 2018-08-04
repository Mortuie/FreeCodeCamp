import React, { Component } from 'react';
import axios from 'axios';
import { base } from '../Constants';

class Homepage extends Component {
  componentWillMount() {
    axios
      .get(base + '/poll/getall')
      .then(res => console.log(res))
      .catch(err => console.warn(err));
  }

  render() {
    return <div>Hello World!</div>;
  }
}

export default Homepage;
