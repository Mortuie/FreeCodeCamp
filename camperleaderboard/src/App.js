import React from 'react';
import NavBar from './NavBar';
import Leaderboard from './Leaderboard';
import {StyleSheet, css} from 'aphrodite';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			allTime: false,
		};
	}

	obj = {
		'All time': () => this.setState({allTime: true}),
		'Past thirty days': () => this.setState({allTime: false}),
	}

	render() {
		return(
			<div>

				<NavBar title="Camper Leaderboard" links={this.obj}/>

				<Leaderboard allTime={this.state.allTime}/>

				<div className={css(styles.footer)}>Made by Leon Boehmer</div>
			</div>
		);
	}
}

const styles = StyleSheet.create({
	footer: {
		textAlign: 'center',
		backgroundColor: '#084c61',
	}
});
