import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { backendBase } from '../config';

const DEREGISTER = 'DEGREGISTER';
const REGISTER = 'Click me';

class Event {
  @observable id;
  @observable alias;
  @observable image_url = 'http://mydaymyplan.com//images/no-image-large.png';
  @observable going = 0;
  @observable me = false;

  @computed get buttonText() {
    return this.me ? DEREGISTER : REGISTER;
  }

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
    console.log('this: ', this.id);
    if (this.buttonText === REGISTER) {
      axios
        .post(
          `${backendBase}/api/v1/going`,
          {
            id: this.id
          },
          {
            withCredentials: true
          }
        )
        .then(res => {
          console.log(res);

          this.me = res.data.me;
          this.going = res.data.going;
        })
        .catch(err => console.log(err));
    } else {
      axios
        .delete(`${backendBase}/api/v1/going`, {
          data: {
            id: this.id
          },
          withCredentials: true
        })
        .then(res => {
          console.log(res);

          this.me = res.data.me;
          this.going = res.data.going;
        })
        .catch(err => console.log(res));
    }
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
        },
        withCredentials: true
      })
      .then(res => {
        console.log(res);
        this.events = [];
        res.data.places.map(p => this.events.push(new Event(p)));
      })
      .catch(err => console.log(err));
  }
}

export default EventStore;
