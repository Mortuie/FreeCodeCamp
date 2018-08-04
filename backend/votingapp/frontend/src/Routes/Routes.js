import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../Misc';
import { Login } from '../User';
import { AuthRoute, UnauthRoute } from './Subroutes';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <UnauthRoute path="/login" user={false} component={Login} pathname={'/'} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
