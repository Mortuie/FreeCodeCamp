import React from 'react';
import SingleSquare from './SingleSquare';
import {StyleSheet, css} from 'aphrodite';


export default class Board extends React.Component {

	constructor() {
		super();
		this.state = {
			board: null,
		};
		this.newBoard = this.newBoard.bind(this);
	}


	newBoard() {
		var tempBoard = [];

		for (var i = 0; i < this.props.height; i++) {
				tempBoard.push([]);
			for (var j = 0; j < this.props.width; j++) {
				tempBoard[i].push(Math.floor(Math.random() * 6));
			}
		}
		this.setState({board: tempBoard});
	}

	componentWillMount() {
		this.newBoard();
	}

	render() {
		var b = this.state.board;
		
		return (
			<div>
				
				{b.map(j => 
					<div className={css(styles.row)}>{j.map(i => <SingleSquare isAlive={i}/>)}</div>
				)}

			</div>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
	}
});