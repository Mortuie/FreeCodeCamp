import React, { Component } from 'react';
import axios from 'axios';
import PollContainer from './PollContainer';
import { BASE } from '../Constants';
import { connect } from 'react-redux';

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
    return <PollContainer polls={this.state.polls} user={this.props.user} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Homepage);
