import React, { Component } from 'react';
import { login } from './Actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const StyledAvatar = styled(Avatar)`
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 310px;
  height: 310px;
  padding: 15px;
  margin-top: 100px;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
        <div>LOADING....</div>
      );
    }
    const error = this.props.error || this.state.error;

    return (
      <Container>
        <StyledPaper>
        <Avatar>
          <LockIcon />
        </Avatar>
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
            <Button
              onClick={this.login}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
            {error ? (
              <ErrorBar>{error}</ErrorBar>
            ) : (
              <ErrorBar></ErrorBar>
            )}

          </form>
        </StyledPaper>
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
