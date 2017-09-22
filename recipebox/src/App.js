import React from 'react';
import Recipe from './Recipe';


export default class App extends React.Component {

	obj = {
		0: {title: "ChickenSoup", ingredients: "nigga, nigga, nigga", defaultCollapsed: false, showModal: false},
		1: {title: "banter", ingredients: "one, two, three", defaultCollapsed: false, showModal: false},
	};


	render() {
		return (
			<div>

				<Recipe recipes={this.obj}/>

			</div>
		);
	}
}


