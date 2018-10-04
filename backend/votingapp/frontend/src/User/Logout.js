import React, { Component } from 'react';
import { logout } from './Actions';
import { connect } from 'react-redux';

class Logout extends Component {

  out() {
    this.props.logout();
    console.log(this.props);
    this.props.history.push('/');
  }

  render() {
    this.out();
    return <div />;
  }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);