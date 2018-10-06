import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BASE } from '../Constants';

const Container = styled.div`
  width: 250px;
  height: 100px;
  border: 3px solid grey;
  margin: 3px;
  padding: 4px;
  position: relative;
`;

const Title = styled.div`
  text-align: center;
  width: 65%;
  margin: auto;
  cursor: pointer;
  height: 80%;
`;

const Cross = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: bold;
  cursor: pointer;
`;

class Poll extends Component {

  deletePoll = () => {
    const res = confirm("Are you sure you want to delete this poll?");

    if (res) {
      console.log("This dood wants to delete the poll");

      axios.delete(BASE + '/poll', {
        params: { id: this.props.data._id },
        withCredentials: true,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }

  }

  render() {
    const { title, _id } = this.props.data;
    return (
      <Container>
        <Title onClick={() => this.props.history.push('/poll/' + _id)}>{title}</Title>
        {this.props.user &&
          <Cross onClick={this.deletePoll}>X</Cross>
        }
      </Container>
    );
  }
}

Poll.propTypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(Poll);
