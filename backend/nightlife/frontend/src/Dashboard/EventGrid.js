import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Event = observer(({ event }) => (
  <EventCell>
    <div>{event.alias}</div>
    <EventImage src={event.image_url} />
    <div>{event.going}</div>
    <button onClick={event.ister}>Click me</button>
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

@observer
class EventGrid extends Component {
  render() {
    const { events } = this.props.events;
    return (
      <Grid>
        {events.map(e => (
          <Event event={e} />
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
