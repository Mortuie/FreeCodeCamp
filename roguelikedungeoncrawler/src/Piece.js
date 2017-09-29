import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class Piece extends Component {


	render() {
		var style;

		switch (this.props.typeOfPiece) {
			case 0: 
				style = styles.black;
				break;
			case 1:
				style = styles.red;
				break;
			default:
				break;
		}



		return <div className={css(style, styles.box)}></div>;
	}
}

const styles = StyleSheet.create({
	box: {
		width: '5px',
		height: '5px',
	},
	black: {
		backgroundColor: 'black',
	},
	red: {
		backgroundColor: 'red',
	}


});