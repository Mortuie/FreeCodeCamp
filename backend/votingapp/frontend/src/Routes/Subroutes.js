import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const AuthRoutes = ({ user, component: Component, redirect, ...rest }) => (
  <Route
    {...rest}
    render={props => (user ? <Component {...props} /> : <Redirect to={{ pathname: redirect }} />)}
  />
);

AuthRoutes.propTypes = {
  user: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

const UnauthRoutes = ({ user, component: Component, redirect, ...rest }) => (
  <Route
    {...rest}
    render={props => (!user ? <Component {...props} /> : <Redirect to={{ pathname: redirect }} />)}
  />
);

UnauthRoutes.propTypes = {
  user: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

export { AuthRoutes, UnauthRoutes };
