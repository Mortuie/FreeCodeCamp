import React, { Component } from 'react';
import { register } from './Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';

const StyledAvatar = styled(Avatar)`
  background-color: red;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 310px;
  height: 380px;
  padding: 15px;
  margin-top: 100px;
`;

const ErrorBar = styled.div`
  color: red;
  width: 90%;
  height: 50px;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;

class Register extends Component {
  state = {
    email: '',
    password: '',
    cpassword: '',
    error: ''
  };

  changeState = e => {
    let obj = { error: '' };
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  register = () => {
    if (this.state.email && this.state.password === this.state.cpassword)
      this.props.register(this.state.email, this.state.password);
    else
      this.setState({
        error: 'Enter something into the fields and make sure both passwords match!'
      });
  };

  render() {
    if (this.props.attempting) {
      return <RegisterBox>LOADING....</RegisterBox>;
    }

    const error = this.props.error || this.state.error;

    return (
      <div>
        <StyledPaper>
          <StyledAvatar>
            <LockIcon />
          </StyledAvatar>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.changeState}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.changeState}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
              <Input
                name="cpassword"
                type="password"
                id="cpassword"
                autoComplete="cpassword"
                value={this.state.cpassword}
                onChange={this.changeState}
              />
            </FormControl>
            {error ? <ErrorBar>{error}</ErrorBar> : <ErrorBar />}
            <Button
              onClick={this.register}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
        </StyledPaper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    attempting: state.userReducer.attempting,
    error: state.userReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password) => dispatch(register(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
