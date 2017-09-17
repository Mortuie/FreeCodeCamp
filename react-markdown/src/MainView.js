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
 				<h1 className={css(styles.title)}>Markdown Previewer</h1>

	 			<div className={css(styles.horizontal)}>
		 			<TextInput changeText={this.changeText} styles={styles.textView}/>
		 			<MarkdownView textDisplay={this.state.text} styles={styles.markdownView}/>
		 		</div>
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
	},
	markdownView: {
		width: '50%',
		height: '602px',
		border: '1px solid black',
		marginLeft: '5px',
	},
	title: {
		textAlign: 'center',
	}
});