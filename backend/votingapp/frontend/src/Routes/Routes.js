import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../Misc';
import { Login } from '../User';
import { Homepage } from '../Homepage';
import { Votepage } from '../Votepage';
import {} from './Subroutes';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <UnauthRoute path={'/login'} user={true} component={Login} redirect={'/'} />
        <Route path="/vote/:voteid" component={Votepage} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;

const Authroute = ({ loggedIn, component: Component, redirect: path, ...rest }) => (
  <Route
    {...rest}
    render={props => (loggedIn ? <Component {...props} /> : <Redirect to={{ pathname: path }} />)}
  />
);

const UnauthRoute = ({ loggedIn, component: Component, redirect: path, ...rest }) => (
  <Route
    {...rest}
    render={props => (!loggedIn ? <Component {...props} /> : <Redirect to={{ pathname: path }} />)}
  />
);
