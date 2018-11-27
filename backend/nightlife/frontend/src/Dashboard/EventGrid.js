import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

const Event = observer(({ event, user }) => (
  <EventCell>
    <div>{event.alias}</div>
    <EventImage src={event.image_url} />
    <div>{event.going}</div>
    {user && <button onClick={event.ister}>Click me</button>}
  </EventCell>
));

const EventCell = styled.div`
  width: 200px;
  height: 200px;
  background: grey;
  margin: 3px;
  border-radius: 5px;
  font-family: 'Black Han Sans', sans-serif;
`;

const EventImage = styled.img`
  width: 100px;
  height: 100px;
`;

@inject('userStore')
@observer
class EventGrid extends Component {
  render() {
    const { events } = this.props.events;
    const { userStore } = this.props;
    return (
      <Grid>
        {events.map(e => (
          <Event user={userStore.isLoggedIn} key={e.id} event={e} />
        ))}
      </Grid>
    );
  }
}

const Grid = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default EventGrid;
