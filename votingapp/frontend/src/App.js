import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import Navigation from './components/Navigation.js';
import Dashboard from './components/Dashboard.js';
import Notfound from './components/NotFound.js';
import Login from './components/Login.js';
import PrivateRouter from './components/PrivateRouter.js';


export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			auth: false,

		}


	}




	render() {
		return (
			<div>
				<Navigation authenticated={this.state.auth}/>

				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/login" component={Login} />
					<PrivateRouter 
						path="/createpoll" 
						auth={this.state.auth}
						component={Dashboard} 
						newpath={"/login"}
					/>
					<Route path="/signout" component={Login} />
					<Route path="/register" component={Login} />
					<Route path="*" component={Notfound} />
				</Switch>	


			</div>
		);
	

	}

    


}

