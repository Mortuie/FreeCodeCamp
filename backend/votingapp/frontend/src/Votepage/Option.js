import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { base } from '../Constants';

export default class Option extends Component {
  vote(pollId) {
    axios
      .post(base + '/poll/upvote', {
        id: this.props.id,
        optionid: pollId
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props.data);
    const { name, upvotes, _id } = this.props.data;
    return (
      <div onClick={() => this.vote(_id)}>
        <div>{name}</div>
        <div>{upvotes}</div>
      </div>
    );
  }
}

Option.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};
