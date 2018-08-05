import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Poll from './Poll';
import { pollContainer } from './Homepage.css';

export default class PollContainer extends Component {
  render() {
    return (
      <div className={pollContainer}>
        {this.props.polls.map(poll => <Poll key={poll._id} data={poll} />)}
      </div>
    );
  }
}

PollContainer.propTypes = {
  polls: PropTypes.array.isRequired
};
