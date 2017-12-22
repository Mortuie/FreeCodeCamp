import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dummy from './Dummy';
import { FourOhFour } from '../components/ErrorPages';

export default class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Dummy} />  
        <Route path="/ownpolls" component={Dummy} /> 
        <Route path="/makepoll" component={Dummy} />
        <Route path="/poll" component={Dummy} />
        <Route path="/*" component={FourOhFour} /> 
      </Switch>
    );
  }
}
