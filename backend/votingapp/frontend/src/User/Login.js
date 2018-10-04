import React, { Component } from 'react';
import { login } from './Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const RegisterBox = styled.div`
  margin: auto;
  margin-top: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 310px;
  height: 280px;
  background-color: white;
`;

const Input = styled.input`
  border: none;
  width: 90%;
  height: 40px;
  border-bottom: 1px solid #757575;
  margin-bottom: 4px;
  text-align: center;
`;

const Submit = styled.button`
  margin-top: 10px;
  background-color: #FF5A5F;
  width: 90%;
  height: 50px;
  color: white;
`;

const Title = styled.div`
  font-size: 25px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ErrorBar = styled.div`
  color: red;
  width: 90%;
  height: 50px;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
`;

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: '',
  };

  changeState = (e) => {
    let obj = { error: '' };
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  login = () => {
    if (this.state.email && this.state.password) this.props.login(this.state.email, this.state.password);
    else this.setState({error: 'Enter something into the fields.'});
  }

  render() {
    if (this.props.attempting) {
      return (
        <RegisterBox>LOADING....</RegisterBox>
      );
    }

    const error = this.props.error || this.state.error;

    return (
      <Container>
        <RegisterBox>
          <Title>LOGIN</Title>
          <Input name="email" placeholder="you@example.com" value={this.state.email} onChange={this.changeState} />
          <Input name="password" placeholder="your password" type="password" value={this.state.password} onChange={this.changeState} />
          <Submit onClick={this.login}>SUBMIT</Submit>
          {error ? (
            <ErrorBar>{error}</ErrorBar>
          ) : (
            <ErrorBar></ErrorBar>
          )}
        </RegisterBox>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    attempting: state.userReducer.attempting,
    error: state.userReducer.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);