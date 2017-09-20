import React from 'react';
import $ from 'jquery';
import {StyleSheet, css} from 'aphrodite';

export default class Leaderboard extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	componentDidMount() {
		this.getPastThirty();
		this.getAllTime();
	}

	getPastThirty() {
		return $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(
			(data) => {this.setState({pastThirty: data})});
	}

	getAllTime() {
		return $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(
			(data) => {this.setState({allTime: data})});
	}



	render() {
		var iterateOver = (this.props.allTime) ? this.state.allTime : this.state.pastThirty;

		if (iterateOver) {

			return (
				
				<div className={css(styles.background)}>
					{iterateOver.map((player) => 
						<div className={css(styles.card)} key={player.username}>
							{player.username}
						</div>

					)}
				</div>

			);
			
		} return null;
	}
}

const styles = StyleSheet.create({
	background: {
		width: '50%',
		height: '100%',
		margin: 'auto',
		overflow: 'hidden',
	},
	card: {
		width: '100%',
		height: '100px',
		backgroundColor: 'grey',
		marginTop: '10px',
		marginBottom: '10px',
	}

});