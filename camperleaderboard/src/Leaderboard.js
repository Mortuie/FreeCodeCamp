import React from 'react';
import $ from 'jquery';
import {StyleSheet, css} from 'aphrodite';

export default class Leaderboard extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	componentWillMount() {
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
							<img className={css(styles.image, styles.item)} src={player.img} alt={player.username}/>
							<div className={css(styles.item)}>{player.username}</div>
							<div className={css(styles.item)}>{player.alltime}</div>
							<div className={css(styles.item)}>{player.recent}</div>
						</div>

					)}
				</div>

			);
			
		} return null;
	}
}

const styles = StyleSheet.create({
	background: {
		width: '23%',
		height: '100%',
		margin: 'auto',
		overflow: 'hidden',
	},
	card: {
		width: '100%',
		height: '5%',
		backgroundColor: 'grey',
		marginTop: '10px',
		marginBottom: '10px',
		display: 'flex',
		justifyContext: 'center',
		alignItems: 'center',
		padding: '10px',
	},
	image: {
		width: '75px',
		height: '75px',
		borderRadius: '50%',
	},
	item: {
		margin: '15px',
	}

});