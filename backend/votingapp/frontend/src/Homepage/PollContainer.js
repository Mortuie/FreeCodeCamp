import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Poll from './Poll';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import { BASE } from '../Constants';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Topbar = styled.div`
  border-bottom: solid 1px grey;
  display: flex;
`;

const Cross = styled.button`
  justify-content: flex-end;
`;

Modal.setAppElement('#root');

export default class PollContainer extends Component {
  state = {
    modalIsOpen: false,
    options: '',
    title: '',
    view: false
  };

  changeModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  changeView = () => {
    this.setState({ view: !this.state.view });
  };

  changeState = e => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  addPoll = () => {
    const options = this.state.options.split(',').map(i => {
      return { name: i };
    });

    axios
      .post(
        BASE + '/poll',
        {
          title: this.state.title,
          options
        },
        {
          withCredentials: true
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.props.user && (
          <div>
            <button onClick={this.changeModal}>Add a new poll</button>
            <button onClick={this.changeView}>See your polls</button>
          </div>
        )}
        <Container>
          {this.props.user &&
            this.state.view &&
            this.props.ownPolls &&
            this.props.ownPolls.map(poll => <Poll key={poll._id} data={poll} user />)}
          {!this.state.view && this.props.polls.map(poll => <Poll key={poll._id} data={poll} />)}
        </Container>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.changeModal}>
          <Topbar>
            <div>Adding polls</div>
            <Cross onClick={this.changeModal}>X</Cross>
          </Topbar>
          <input name="title" placeholder="Title" onChange={this.changeState} />
          <input name="options" placeholder="options" onChange={this.changeState} />
          <button onClick={this.addPoll}>Submit</button>
        </Modal>
      </div>
    );
  }
}

PollContainer.propTypes = {
  polls: PropTypes.array.isRequired,
  user: PropTypes.bool.isRequired
};
