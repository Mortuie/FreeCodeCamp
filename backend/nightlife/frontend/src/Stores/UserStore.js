import { observable, action, computed } from 'mobx';

class UserStore {
  @observable user = null;
  @observable longitude = null;
  @observable latitude = null;

  @computed get hasSetCoords() {
    return this.longitude && this.latitude;
  }

  @computed get isLoggedIn() {
    return this.user === null;
  }

  @action logout() {
    this.user = null;
  }

  @action login(user) {
    this.user = user;
  }

  @action setCoords(lat, long) {
    this.latitude = lat;
    this.longitude = long;
  }
}

export default UserStore;
