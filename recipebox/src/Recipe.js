import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import {StyleSheet, css} from 'aphrodite';


export default class Recipe extends React.Component {

	constructor() {
		super();

		this.state = {
			collapsed: false,
			showModal: false,
		}
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}


	changeCollapsedState() {
		this.setState({collapsed: !this.state.collapsed});
	}

	close() {
		this.setState({showModal: false});
	}

	open() {
		this.setState({showModal: true});
	}



	render() {
		return {Array.from(this.props.recipes).map((r) => <div>{r.title}</div>)};
	}


}

const styles = StyleSheet.create({
	textArea: {
		width: '300px',
		height: '75px',
		resize: 'none',
	},
	inputs: {
		display: 'flex',
		flexDirection: 'row',
		justifyContext: 'center',
		alignItems: 'center',
	},
});

/*
	<div key={recipe.title}>
					
						<div onClick={() => this.changeCollapsedState()}>{recipe.title}</div>

						<div>
							{recipe.defaultCollapsed && 
								<div>
									<div>Ingredients</div>
									{recipe.ingredients.split(",").map((ingredient) => <div>{ingredient}</div>)}
									<button onClick={this.open}>edit</button>
								</div>
							}
						</div>


						<Modal show={this.props.showModal} onHide={this.close}>
							<h1>Edit your recipe</h1>
							<div className={css(styles.inputs)}>
								<text>Name:</text>
								<textarea className={css(styles.textArea)} value={recipe.title}/>
							</div>

							<div className={css(styles.inputs)}>
								<text>Ingredients:</text>
								<textarea className={css(styles.textArea)} value={recipe.ingredients}/>
							</div>
							<button>Save</button>
							<button onClick={this.close}>Close</button>
						</Modal>

					</div>




 */