import React from 'react';
import NavBar from './NavBar';
import Leaderboard from './Leaderboard';


export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			allTime: false,
		};
	}

	obj = {
		'All time': () => this.setState({allTime: false}),
		'Past thirty days': () => this.setState({allTime: true}),
	}

	render() {
		return(
			<div>

				<NavBar title="Camper Leaderboard" links={this.obj}/>

				<Leaderboard allTime={this.state.allTime}/>

			</div>
		);
	}
}
