import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { container, titleStyle } from './Homepage.css';
import { withRouter } from 'react-router-dom';

class Poll extends Component {
  render() {
    const { title, _id } = this.props.data;
    return (
      <div className={container} onClick={() => this.props.history.push('/' + _id)}>
        <div className={titleStyle}>{title}</div>
      </div>
    );
  }
}

Poll.propTypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(Poll);
