import React from 'react';
import './App.css';
import Board from './Board';
import {StyleSheet, css} from 'aphrodite';

export default class App extends React.Component {

	constructor() {
		super();	
		this.state = {
			width: 100,
			height: 80,
		};
	}


	render() {
		return (
			<div className={css(styles.background)}>
				<Board width={this.state.width} height={this.state.height}/>
			</div>
		);

	}
}

const styles = StyleSheet.create({
	background: {
		display: 'flex',
		flexDirection: 'column',
		justifyContext: 'center',
		alignItems: 'center',
	}
});