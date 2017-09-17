import React from 'react';

export default class TextInput extends React.Component {



	render() {
		return <textarea onChange={this.props.changeText}></textarea>;
	}
}