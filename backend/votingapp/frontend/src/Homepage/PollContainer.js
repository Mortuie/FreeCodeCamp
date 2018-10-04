import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Poll from './Poll';
import styled from 'styled-components';
import Modal from 'react-modal';

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

Modal.setAppElement('#root')

export default class PollContainer extends Component {

  state = {
    modalIsOpen: false,
  };

  changeModal = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }

  render() {
    return (
      <div>
        {this.props.user &&
          <div>
            <button onClick={this.changeModal}>Add a new poll</button>
          </div>
        }
        <Container>
          {this.props.polls.map(poll => (
            <Poll key={poll._id} data={poll} />
          ))}
        </Container>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.changeModal}
        >
          <Topbar>
            <div>Adding polls</div>
            <Cross onClick={this.changeModal}>X</Cross>
          </Topbar>
        </Modal>
      </div>
    );
  }
}

PollContainer.propTypes = {
  polls: PropTypes.array.isRequired,
  user: PropTypes.bool.isRequired
};
