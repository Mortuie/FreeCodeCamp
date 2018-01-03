import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Dummy from './Dummy';
import {Login, Register} from '../components/users';


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Dummy} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            
            </Switch>
        );
    }
}