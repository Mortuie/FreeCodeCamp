import React from 'react';
import Recipe from './Recipe';


export default class App extends React.Component {

	localRecipes = {};
	nextNumber = null;

	constructor() {
		super();

		if (localStorage.length === 0) { // set localStorage
			// localStorage.removeItem(0);
			// localStorage.removeItem(1);
			// localStorage.removeItem(2);
			//localStorage.setItem(99999, 2); // next free key
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

		this.nextNumber = localStorage.getItem(0);
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
		this.setState({editIngredients: event.target.value});
	}

	editRecipe(key) {
		if (this.state.editName === "" && this.state.editIngredients === "") {
			alert("Values have been kept the same!");
		} else if (this.state.editName === "") {
			this.localRecipes[key] = {title: this.localRecipes[key].title, ingredients: this.state.editIngredients, collapsed: true};
		} else if (this.state.editIngredients === "") {
			this.localRecipes[key] = {title: this.state.editName, ingredients: this.localRecipes[key].ingredients, collapsed: true};
		} else {
			this.localRecipes[key] = {title: this.state.editName, ingredients: this.state.editIngredients, collapsed: true};
		}


		localStorage.setItem(key, JSON.stringify(this.localRecipes[key]));
		this.setState({recipes: this.localRecipes});
		this.setState({editName: "", editIngredients: ""});
	}

	createNewRecipe() {
		this.nextNumber = localStorage.getItem(0);

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
		localStorage.setItem(0, this.nextNumber);
		// addd the new recipe....
		this.setState({newName: "", newIngredients: "", recipes: this.localRecipes});
		alert("New recipe added!");
	}

	render() {
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
					changeEditIngredients={this.changeEditIngredients}
					editRecipe={this.editRecipe}
					editName={this.state.editName}
					editIngredients={this.state.editIngredients}
				/>
			</div>
		);
	}
}


