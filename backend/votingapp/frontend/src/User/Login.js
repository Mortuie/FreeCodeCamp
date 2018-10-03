import React, { Component } from 'react';
import register from './Actions';
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

  render() {
    return (
      <div>
        <input name="email" value={this.state.email} onChange={this.changeState} />
        <input name="password" type="password" value={this.state.password} onChange={this.changeState} />
        <button>Submit</button>
      </div>
    );
  }
}

// TODO
const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    register: dispatch(register(this.state.email, this.state.password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);