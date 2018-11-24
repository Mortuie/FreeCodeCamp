import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { backendBase } from '../config';

class Event {
  @observable id;
  @observable alias;
  @observable image_url = 'http://mydaymyplan.com//images/no-image-large.png';
  @observable going = 0;
  @observable me = false;

  constructor(event) {
    this.id = event.id;
    this.alias = event.alias;
    if (event.me) {
      this.me = true;
    }
    if (event.going) {
      this.going = event.going;
    }
    if (event.image_url) {
      this.image_url = event.image_url;
    }
  }

  @action ister = () => {
    // console.log('id: ', this.id, ' has been pressed');
    console.log('this: ', this.id);
  };
}

class EventStore {
  @observable events = [];
  @observable state = 'loading';
  @observable error = null;

  @action getEvents(lat, long) {
    axios
      .get(`${backendBase}/places`, {
        params: {
          latitude: lat,
          longitude: long
        }
      })
      .then(res => {
        console.log(res);
        res.data.places.map(p => this.events.push(new Event(p)));
      })
      .catch(err => console.log(err));
  }
}

export default EventStore;
