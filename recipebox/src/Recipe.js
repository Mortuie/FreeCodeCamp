import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import {StyleSheet, css} from 'aphrodite';


export default class Recipe extends React.Component {

	constructor() {
		super();
		this.state = {
			showModal: false,
			showNewRecipeModal: false,
			newName: "",
			newIngredients: "",
		}

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}

	close() {
		this.setState({showModal: false});
	}

	open() {
		this.setState({showModal: true});
	}

	render() {

		var r = this.props.recipes;

		return (
			<div>

				{Object.keys(r).map((key) => 
					<div key={r[key].title}>

						<div onClick={() => {this.props.changeCollapsed(key)}}>{r[key].title}</div>

						<div>
							{r[key].collapsed && 
								<div>
									<div>Ingredients</div>
									{r[key].ingredients.split(",").map((ingredient) => <div>{ingredient}</div>)}
									<button onClick={this.open}>edit</button>
								</div>
							}
						</div>


	 					<Modal show={this.state.showModal} onHide={this.close}>
	 						<h1>Edit your recipe</h1>
	 						<div >
	 							<text>Name:</text>
	 							<textarea />
	 						</div>

							<div>
								<text>Ingredients:</text>
								<textarea />
							</div>
							<button>Save</button>
							<button onClick={this.close}>Close</button>
						</Modal>


					</div>
				)}
				<button onClick={() => this.setState({showNewRecipeModal: true})}>Add recipe</button>

				<Modal show={this.state.showNewRecipeModal} onHide={() => this.setState({showNewRecipeModal: false})}>
					<h1>Add a new recipe</h1>

					<div>
						<div>Name:</div>
						<textarea onChange={this.props.changeNewName} value={this.props.newName}></textarea>
					</div>


					<div>
						<div>Ingredients:</div>
						<textarea onChange={this.props.changeNewIngredients} value={this.props.newIngredients}></textarea>
					</div>


					<button onClick={this.props.createNewRecipe}>Save</button>
					<button onClick={() => this.setState({showNewRecipeModal: false})}>Close</button>
				</Modal>
			</div>
		);
	}


}


/*

<div onClick={() => this.changeCollapsedState()}>{recipe.title}</div>

	// 					<div>
	// 						{recipe.collapsed && 
	// 							<div>
	// 								<div>Ingredients</div>
	// 								{recipe.ingredients.split(",").map((ingredient) => <div>{ingredient}</div>)}
	// 								<button onClick={this.open}>edit</button>
	// 							</div>
	// 						}
	// 					</div>


	// 					<Modal show={this.props.showModal} onHide={this.close}>
	// 						<h1>Edit your recipe</h1>
	// 						<div className={css(styles.inputs)}>
	// 							<text>Name:</text>
	// 							<textarea className={css(styles.textArea)} value={recipe.title}/>
	// 						</div>

	// 						<div className={css(styles.inputs)}>
	// 							<text>Ingredients:</text>
	// 							<textarea className={css(styles.textArea)} value={recipe.ingredients}/>
	// 						</div>
	// 						<button>Save</button>
	// 						<button onClick={this.close}>Close</button>
	// 					</Modal>

 */