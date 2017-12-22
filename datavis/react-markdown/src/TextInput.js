import React from 'react';
import {css} from 'aphrodite';


export default class TextInput extends React.Component {

	render() {
		return <textarea className={css(this.props.styles)} onChange={this.props.changeText}></textarea>;
	}
}