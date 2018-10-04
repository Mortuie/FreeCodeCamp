import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background: #FF5A5F;
`;

const Path = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin-right: 5px;
  margin-left: ${props => props.left ? '5px' : '0'};
  margin-top: 10px;
  float: ${props => props.left ? 'left' : 'right'};
`;

class Navbar extends Component {

  getBar = () => {
    if (this.props.user) { // logged in
      return (
        <Wrapper>
          <Path left to="/">VOTING</Path>
          <Path to="/logout">LOGOUT</Path>
        </Wrapper>
      );
    } else { // not logged in
      return (
        <Wrapper>
          <Path left to="/">VOTING</Path>
          <Path to="/register">REGISTER</Path>
          <Path to="/login">LOGIN</Path>
        </Wrapper>
      );
    }
  }

  render() {
    return this.getBar();
  }
}


const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Navbar);
