import React from 'react';
import {css} from 'aphrodite';
var marked = require('marked');


export default class MardownView extends React.Component {

	getMarkup(string) {
		return {__html: marked(string, {sanitize: true})};
	}

	render() {


		return <span className={css(this.props.styles)} dangerouslySetInnerHTML={this.getMarkup(this.props.textDisplay)}></span>;
	}
}