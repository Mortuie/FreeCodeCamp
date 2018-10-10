import React, { Component } from 'react';
import { Routes } from '../Routes';
import { Navbar } from '../Navbar';
import styled from 'styled-components';


export default class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}
