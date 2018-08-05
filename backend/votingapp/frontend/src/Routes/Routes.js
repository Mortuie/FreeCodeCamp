import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../Misc';
import { Login } from '../User';
import { Homepage } from '../Homepage';
import { Votepage } from '../Votepage';
import { AuthRoute, UnauthRoute } from './Subroutes';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/:voteid" component={Votepage} />
        <UnauthRoute path="/login" user={false} component={Login} pathname={'/'} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
