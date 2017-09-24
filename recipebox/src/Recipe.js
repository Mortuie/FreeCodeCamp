import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import {StyleSheet, css} from 'aphrodite';
import {Header, Title, Footer} from 'react-bootstrap';


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
							{!r[key].collapsed && 
								<div>
									<div>Ingredients</div>
									{r[key].ingredients.split(",").map((ingredient) => <div>{ingredient}</div>)}
									<button onClick={this.open}>edit</button>
								</div>
							}
						</div>


	 					<Modal show={this.state.showModal} onHide={this.close}>
	 						<Modal.Header closeButton>
	 							<Modal.Title>Edit your recipe</Modal.Title>
	 						</Modal.Header>

	 						<div className={css(styles.modalBoxes)}>
	 							<text>Name:</text>
	 							<textarea className={css(styles.textArea)} onChange={this.props.changeEditName} value={this.props.editName} placeholder={r[key].title}></textarea>
	 						</div>

							<div className={css(styles.modalBoxes)}>
								<text>Ingredients:</text>
								<textarea className={css(styles.textArea)} onChange={this.props.changeEditIngredients} value={this.props.editIngredients} placeholder={r[key].ingredients}></textarea>
							</div>


							<button onClick={() => {this.props.editRecipe(key)}}>Save</button>
							<button onClick={this.close}>Close</button>
						</Modal>


					</div>
					
				)}

				<button onClick={() => this.setState({showNewRecipeModal: true})}>Add recipe</button>

				<Modal show={this.state.showNewRecipeModal} onHide={() => this.setState({showNewRecipeModal: false})}>

					<Modal.Header closeButton>
						<Modal.Title>Add a new recipe</Modal.Title>
					</Modal.Header>


					<div className={css(styles.modalBoxes)}>
						<div>Name:</div>
						<textarea className={css(styles.textArea)} onChange={this.props.changeNewName} value={this.props.newName}></textarea>
					</div>


					<div className={css(styles.modalBoxes)}>
						<div>Ingredients:</div>
						<textarea className={css(styles.textArea)} onChange={this.props.changeNewIngredients} value={this.props.newIngredients}></textarea>
					</div>

					<Modal.Footer>
						<button onClick={this.props.createNewRecipe}>Save</button>
						<button onClick={() => this.setState({showNewRecipeModal: false})}>Close</button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}


}

const styles = StyleSheet.create({
	modalBoxes: {
		display: 'flex',
		justifyContext: 'center',
		alignItems: 'center',
		fontSize: '20px',
		marginTop: '5px',
		marginBottom: '5px',
	},
	textArea: {
		resize: 'none',
	}
});