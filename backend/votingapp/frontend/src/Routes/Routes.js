import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from '../Misc';
import { AuthRoute, UnauthRoute } from './Subroutes';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route path='*' component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;