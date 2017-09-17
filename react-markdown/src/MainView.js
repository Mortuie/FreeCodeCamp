import React from 'react';
import TextInput from './TextInput';
import MarkdownView from './MarkdownView';

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
	 			<TextInput changeText={this.changeText}/>
	 			<MarkdownView/>
	 		</div>
 		);
    	}

}

