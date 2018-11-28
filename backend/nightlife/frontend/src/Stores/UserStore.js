import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { opencageApiKey, backendBase } from '../config';

class UserStore {
  @observable user = null;
  @observable longitude = null;
  @observable latitude = null;
  // @observable city = null;
  @observable city = 'London';
  @observable state = 'loading';
  @observable error = null;

  @computed get hasSetCoords() {
    return this.longitude && this.latitude;
  }

  @computed get isLoggedIn() {
    return this.user !== null;
  }

  @action logout() {
    this.user = null;
  }

  @action login() {
    this.user = true;
  }

  @action setCoords(lat, long) {
    this.latitude = lat;
    this.longitude = long;
  }

  @action getCity() {
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${this.latitude}+${
          this.longitude
        }&key=${opencageApiKey}`
      )
      .then(res => {
        console.log(res.data.results[0].components.city);
        const city = res.data.results[0].components.city;

        this.state = 'fetched';
        this.city = city;
      })
      .catch(err => {
        console.log(err);
        this.state = 'error';
        this.error = err;
      });
  }
}

export default UserStore;
