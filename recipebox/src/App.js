import React from 'react';
import Recipe from './Recipe';


export default class App extends React.Component {

	localRecipes = {};

	constructor() {
		super();

		if (localStorage.length === 0) { // set localStorage
			localStorage.setItem(0, JSON.stringify({
				title: "Pancakes",
				ingredients: "Eggs,Milk,Flour",
				collapsed: true,
			}));
			localStorage.setItem(1, JSON.stringify({
				title: "Porridge",
				ingredients: "Oats,Milk",
				collapsed: true,
			}));
		}

		Object.keys(localStorage).map((key) => {
			this.localRecipes[key] = JSON.parse(localStorage.getItem(key));
		});


		this.state = {
			recipes: this.localRecipes,
		};
		this.changeCollapsed = this.changeCollapsed.bind(this);

	}


	changeCollapsed(key) {
		this.localRecipes[key].collapsed = !this.localRecipes[key].collapsed;
		var ls = JSON.parse(localStorage.getItem(key));
		ls.collapsed = !ls.collapsed;
		localStorage.setItem(key, JSON.stringify(ls));
		this.setState({recipes: this.localRecipes});

	}

	render() {
		console.log(this.state.recipes[0].collapsed);
		console.log(localStorage);
		return (
			<div>
				<Recipe recipes={this.state.recipes} changeCollapsed={this.changeCollapsed}/>
			</div>
		);
	}
}


