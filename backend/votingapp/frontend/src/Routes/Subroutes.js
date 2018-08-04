import React from 'react';
import PropTypes from 'prop-types';

const AuthRoutes = ({ user, component, pathname, ...rest }) => (
  <Route
    {...rest}
    render={props => (user ? <component {...props} /> : <Redirect to={{ pathname }} />)}
  />
);

AuthRoutes.propTypes = {
  user: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

const UnauthRoutes = ({ user, component, pathname, ...rest }) => (
  <Route
    {...rest}
    render={props => (!user ? <component {...props} /> : <Redirect to={{ pathname }} />)}
  />
);

UnauthRoutes.propTypes = {
  user: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

export { AuthRoutes, UnauthRoutes };
