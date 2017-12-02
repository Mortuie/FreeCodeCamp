import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRouter = ({component: Component, auth: isAuth, newpath: newpath, ...rest}) => (
	<Route {...rest} render={props => (
		isAuth ? (
			<Component {...props} />	
		) : (
			<Redirect to={{pathname: newpath}} />
		)
	)} />
);
export default PrivateRouter;
