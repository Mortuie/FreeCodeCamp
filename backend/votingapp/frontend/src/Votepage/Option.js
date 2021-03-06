import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE } from '../Constants';

export default class Option extends Component {
  vote(pollId) {
    axios
      .post(BASE + '/poll/upvote', {
        id: this.props.id,
        optionid: pollId
      })
      .then(res => this.props.updatePoll(res.data.status))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props.data);
    const { name, upvotes, _id } = this.props.data;
    return (
      <div onClick={() => this.vote(_id)}>
        <div>{name}</div>
      </div>
    );
  }
}

Option.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};
