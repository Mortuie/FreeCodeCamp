import React, { Component } from 'react';
import { register } from './Actions';
import { connect } from 'react-redux';

class Login extends Component {

  state = {
    email: '',
    password: '',
  };

  changeState = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  login = () => {
    if (this.state.email && this.state.password)
      this.props.register(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <input name="email" value={this.state.email} onChange={this.changeState} />
        <input name="password" type="password" value={this.state.password} onChange={this.changeState} />
        <button onClick={this.login}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password) => dispatch(register(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);