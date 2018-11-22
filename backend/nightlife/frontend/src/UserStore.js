import { observable, computed } from 'mobx';

class User {
  @observable user = null;

  @computed get loggedIn() {
    return this.user;
  }

  login(user) {
    this.user = user;
  }

  logout() {
    this.user = null;
  }
}

export default new User();
