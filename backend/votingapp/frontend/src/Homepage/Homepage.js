import React, { Component } from 'react';
import axios from 'axios';
import PollContainer from './PollContainer';
import { BASE } from '../Constants';
import { connect } from 'react-redux';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      polls: [],
      ownPolls: []
    };
  }

  componentWillMount() {
    axios
      .get(BASE + '/poll/getall')
      .then(res => {
        const allPolls = res.data.polls;
        let ownPolls = [];

        if (this.props.user) { // only if logged in
          axios.get(BASE + '/poll/user', {
            withCredentials: true,
          })
          .then(res => {
            ownPolls = res.data.polls;
            this.setState({ polls: allPolls, ownPolls })
          })
          .catch(err => console.log(err));
        } else {
          this.setState({ polls: allPolls });
        }
      })
      .catch(err => console.warn(err));
  }

  render() {
    console.log(this.state);
    return <PollContainer polls={this.state.polls} ownPolls={this.state.ownPolls} user={this.props.user} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Homepage);
