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
			newName: "",
			newIngredients: "",
		};
		this.changeCollapsed = this.changeCollapsed.bind(this);
		this.changeNewName = this.changeNewName.bind(this);
		this.changeNewIngredients = this.changeNewIngredients.bind(this);
		this.createNewRecipe = this.createNewRecipe.bind(this);
	}

	changeNewName(event) {
		this.setState({newName: event.target.value});
	}

	changeNewIngredients(event) {
		this.setState({newIngredients: event.target.value});
	}


	changeCollapsed(key) {
		this.localRecipes[key].collapsed = !this.localRecipes[key].collapsed;
		this.setState({recipes: this.localRecipes});
	}

	createNewRecipe() {
		console.log(this.state.newName + " " + this.state.newIngredients);

		this.setState({newName: "", newIngredients: ""});
	}

	render() {
		console.log(this.state.recipes[0].collapsed);
		console.log(localStorage);
		return (
			<div>
				<Recipe 
					recipes={this.state.recipes} 
					changeCollapsed={this.changeCollapsed} 
					newName={this.state.newName} 
					newIngredients={this.state.newIngredients}
					changeNewName={this.changeNewName}
					changeNewIngredients={this.changeNewIngredients}
					createNewRecipe={this.createNewRecipe}
				/>
			</div>
		);
	}
}


