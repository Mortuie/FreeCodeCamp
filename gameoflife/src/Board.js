import React from 'react';



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

		for (var i = 0; i < this.props.width; i++) {
				tempBoard.push([]);
			for (var j = 0; j < this.props.height; j++) {
				tempBoard[i].push([Math.floor(Math.random() * 2)]);
			}
		}
		this.setState({board: tempBoard});
	}

	componentWillMount() {
		this.newBoard();
	}

	render() {
		console.log(this.state.board);
		return (
			<div>HI</div>
		);
	}
}