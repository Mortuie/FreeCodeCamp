import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { TwitterLogin } from '../User';
import Notfound from '../Notfound';
import { Dashboard } from '../Dashboard';

@inject('userStore', 'eventStore')
@observer
class Routes extends Component {
  getBar() {
    if (this.props.userStore.isLoggedIn) {
      console.log('logged in');
    } else {
      console.log('not logged in..');
    }
  }

  render() {
    this.getBar();
    const { userStore, eventStore } = this.props;
    eventStore.getEvents(userStore.latitude, userStore.longitude);
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login/twitter" component={TwitterLogin} />
        <Route path="*" component={Notfound} />
      </Switch>
    );
  }
}

export default Routes;
