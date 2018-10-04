import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 250px;
  height: 100px;
  border: 3px solid grey;
  margin: 3px;
  padding: 4px;
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
`;

class Poll extends Component {
  render() {
    const { title, _id } = this.props.data;
    return (
      <Container onClick={() => this.props.history.push('/' + _id)}>
        <Title>{title}</Title>
      </Container>
    );
  }
}

Poll.propTypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(Poll);
