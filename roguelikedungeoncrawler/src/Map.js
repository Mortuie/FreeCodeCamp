import React, {Component} from 'react';


export default class Map extends Component {

	constructor() {
		super();
		this.state = {
			map: null,
		}
	}


	componentWillMount() { // generation of the map
		var nodes = [];


		for (var i = 0; i < 5; i++) {
			nodes.push(this.generateAnotherNode());
		}

		console.log(nodes);

	}

	generateAnotherNode() {
		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];


		var boundaryWidth = Math.floor(width / 3);
		var boundaryHeight = Math.floor(height / 3);


		return [this.getRandomInteger(boundaryWidth) + boundaryWidth, this.getRandomInteger(boundaryHeight) + boundaryHeight];
	}


	getRandomInteger(upTo) {
		return Math.floor(Math.random() * upTo);
	}



	render() {

		console.log(this.props.dimensions); // width x height


		return <div>HI</div>;		
	}
}