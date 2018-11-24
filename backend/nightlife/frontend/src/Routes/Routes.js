import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { TwitterLogin } from '../User';
import Notfound from '../Notfound';

@inject('userStore')
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
    return (
      <Switch>
        <Route exact path="/" component={TwitterLogin} />
        <Route path="*" component={Notfound} />
      </Switch>
    );
  }
}

export default Routes;
