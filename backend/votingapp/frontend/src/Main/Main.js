import React, { Component } from 'react';
import { Routes } from '../Routes';
import { Navbar } from '../Navbar';
import styled from 'styled-components';

const Background = styled.div`
  background-color: #F0F0F0;
`;

export default class Main extends Component {
  render() {
    return (
      <Background>
        <Navbar />
        <Routes />
      </Background>
    );
  }
}
