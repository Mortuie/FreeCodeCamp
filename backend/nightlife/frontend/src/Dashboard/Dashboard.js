import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import EventGrid from './EventGrid';
import { TwitterLogin } from '../User';

const Header = styled.div`
  margin: auto;
  background: grey;
  font-size: 35px;
  text-align: center;
  width: 350px;
  margin-top: 40px;
`;

@inject('userStore', 'eventStore')
@observer
class Dashboard extends Component {
  render() {
    const { userStore, eventStore } = this.props;

    return (
      <div>
        {!userStore.isLoggedIn && <TwitterLogin />}
        <Header>Events in {userStore.city}</Header>
        <EventGrid events={eventStore} />
      </div>
    );
  }
}

export default Dashboard;
