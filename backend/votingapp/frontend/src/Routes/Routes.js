import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { NotFound } from '../Misc';
import { Register, Login } from '../User';
import { Homepage } from '../Homepage';
import { Votepage } from '../Votepage';
import { connect } from 'react-redux';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <UnauthRoute path={'/register'} user={this.props.user} component={Register} redirect={'/'} />
        <UnauthRoute path={'/login'} user={this.props.user} component={Login} redirect={'/'} />
        <Route path="/vote/:voteid" component={Votepage} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
}

export default withRouter(connect(mapStateToProps)(Routes));

const Authroute = ({ user, component: Component, redirect: path, ...rest }) => (
  <Route
    {...rest}
    render={props => (user ? <Component {...props} /> : <Redirect to={{ pathname: path }} />)}
  />
);

const UnauthRoute = ({ user, component: Component, redirect: path, ...rest }) => (
  <Route
    {...rest}
    render={props => (!user ? <Component {...props} /> : <Redirect to={{ pathname: path }} />)}
  />
);
