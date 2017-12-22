import React from 'react';
import TextInput from './TextInput';
import MarkdownView from './MarkdownView';
import {StyleSheet, css} from 'aphrodite';

export default class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
			text: '',
		};
	}

	changeText = (event) => {
		this.setState({text: event.target.value});
	}

	render() {
		console.log(this.state.text);
 		return (
 			<div>

 				<div className={css(styles.title)}>Markdown Previewer</div>

	 			<div className={css(styles.horizontal)}>
		 			<TextInput changeText={this.changeText} styles={styles.textView}/>
		 			<MarkdownView textDisplay={this.state.text} styles={styles.markdownView}/>
		 		</div>

		 		<div className={css(styles.footer)}>Made by Leon Boehmer</div>
		 	</div>
 		);
    	}

}

const styles = StyleSheet.create({
	horizontal: {
		display: 'flex',
		flexDirection: 'row',
	},
	textView: {
		width: '50%',
		height: '600px',
		resize: 'none',
		marginRight: '5px',
		marginLeft: '5px',
	},
	markdownView: {
		backgroundColor: 'white',
		width: '50%',
		height: '602px',
		border: '1px solid black',
		marginLeft: '5px',
		marginRight: '5px',
	},
	title: {
		backgroundColor: '#4484ce',
		marginTop: '0px',
		marginBottom: '10px',
		color: 'black',
		height: '100px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		paddingLeft: '10px',
		fontSize: '30px',
	},
	footer: {
		marginTop: '10px',
		textAlign: 'center',
	}
});