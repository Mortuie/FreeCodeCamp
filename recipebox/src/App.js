import React from 'react';
import Recipe from './Recipe';


export default class App extends React.Component {

	localRecipes = {};
	nextNumber = 2;

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
			// do something so no duplicate numbers occur
		});


		this.state = {
			recipes: this.localRecipes,
			newName: "",
			newIngredients: "",
			editName: "",
			editIngredients: "",
		};
		this.changeCollapsed = this.changeCollapsed.bind(this);
		this.changeNewName = this.changeNewName.bind(this);
		this.changeNewIngredients = this.changeNewIngredients.bind(this);
		this.createNewRecipe = this.createNewRecipe.bind(this);
		this.changeEditName = this.changeEditName.bind(this);
		this.changeEditIngredients = this.changeEditIngredients.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
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

	changeEditName(event) {
		this.setState({editName: event.target.value});
	}

	changeEditIngredients(event) {
		this.setStatte({editIngredients: event.target.value});
	}

	editRecipe(key) {
		if (this.state.editName !== "" && this.state.ingredients !== "") {
			this.localRecipes[key] = {title: this.state.editName, ingredients: this.state.editIngredients, collapsed: true};
			localStorage.setItem(key, JSON.stringify(this.localRecipes[key]));
			this.setState({recipes: this.localRecipes});
		} else {
			alert("No data entered, please try again.");
		}
	}

	createNewRecipe() {
		console.log(this.state.newName + " " + this.state.newIngredients);

		localStorage.setItem(this.nextNumber, JSON.stringify({
			title: this.state.newName,
			ingredients: this.state.newIngredients,
			collapsed: true,
		}));
		this.localRecipes[this.nextNumber] = {
			title: this.state.newName,
			ingredients: this.state.newIngredients,
			collapsed: true,
		};
		this.nextNumber++;

		// addd the new recipe....
		this.setState({newName: "", newIngredients: "", recipes: this.localRecipes});
	}

	render() {
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
					changeEditName={this.changeEditName}
					changeEditIngredients={this.changeNewIngredients}
					editRecipe={this.editRecipe}
				/>
			</div>
		);
	}
}


