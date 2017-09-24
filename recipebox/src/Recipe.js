import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import {StyleSheet, css} from 'aphrodite';
import {Header, Title, Footer, Body} from 'react-bootstrap';


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
			<div className={css(styles.background)}>

				<div className={css(styles.title)}>Recipe Box</div>

				<div className={css(styles.recipeBox)}>
					{Object.keys(r).map((key) => 

	 					<div key={key}>

							<div className={css(styles.titleRecipe)} onClick={() => {this.props.changeCollapsed(key)}}>{r[key].title}</div>

							<div>
								{!r[key].collapsed && 
									<div>
										<div>Ingredients:</div>
										{r[key].ingredients.split(",").map((ingredient) => <li>{ingredient}</li>)}
										<button onClick={() => this.props.open(key)}>Edit</button>
										<button onClick={() => this.props.delete(key)}>Delete</button>
									</div>
								}
							</div>


		 					<Modal show={r[key].editModal} onHide={() => this.props.close(key)}>
		 						<Modal.Header closeButton>
		 							<Modal.Title>Edit your recipe</Modal.Title>
		 						</Modal.Header>

		 						<Modal.Body>
			 						<div className={css(styles.modalBoxes)}>
			 							<text>Name:</text>
			 							<textarea className={css(styles.textArea)} onChange={this.props.changeEditName} value={this.props.editName} placeholder={r[key].title}></textarea>
			 						</div>

									<div className={css(styles.modalBoxes)}>
										<text>Ingredients:</text>
										<textarea className={css(styles.textArea)} onChange={this.props.changeEditIngredients} value={this.props.editIngredients} placeholder={r[key].ingredients}></textarea>
									</div>
								</Modal.Body>


								<Modal.Footer>
									<button onClick={() => {this.props.editRecipe(key)}}>Save</button>
									<button onClick={() => this.props.close(key)}>Close</button>
								</Modal.Footer>
							</Modal>


						</div>
						
					)}
				</div>

				<button className={css(styles.addRecipe)} onClick={() => this.setState({showNewRecipeModal: true})}>Add recipe</button>

				<Modal show={this.state.showNewRecipeModal} onHide={() => this.setState({showNewRecipeModal: false})}>

					<Modal.Header closeButton>
						<Modal.Title>Add a new recipe</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div className={css(styles.modalBoxes)}>
							<div>Name:</div>
							<textarea className={css(styles.textArea)} onChange={this.props.changeNewName} value={this.props.newName}></textarea>
						</div>


						<div className={css(styles.modalBoxes)}>
							<div>Ingredients:</div>
							<textarea className={css(styles.textArea)} onChange={this.props.changeNewIngredients} value={this.props.newIngredients}></textarea>
						</div>
					</Modal.Body>

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
	background: {
		display: 'flex',
		flexDirection: 'column',
		justifyContext: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: '30px',
		marginTop: '20px',
	},
	recipeBox: {
		backgroundColor: '#c2c3c4',
		width: '60%',
		height: '400px',
		borderRadius: '10px',
	},
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
	},
	addRecipe: {
		border: 'none',
		width: '100px',
		height: '50px',
		marginTop: '10px',
	},
	titleRecipe: {
		fontSize: '20px',
		textAlign: 'left',
		padding: '10px',
	},
});