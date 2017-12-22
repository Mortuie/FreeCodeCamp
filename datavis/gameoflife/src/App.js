import React from 'react';
import './App.css';
import Board from './Board';
import {StyleSheet, css} from 'aphrodite';

export default class App extends React.Component {

	constructor() {
		super();	
		this.state = {
			width: 75,
			height: 75,
		};
	}


	render() {
		return (
			<div className={css(styles.background)}>
				<div>Game of Life</div>
				<Board width={this.state.width} height={this.state.height}/>
				<div>Made by Leon Boehmer with React</div>
			</div>
		);

	}
}

const styles = StyleSheet.create({
	background: {
		color: 'white',
		display: 'flex',
		flexDirection: 'column',
		justifyContext: 'center',
		alignItems: 'center',
	}
});