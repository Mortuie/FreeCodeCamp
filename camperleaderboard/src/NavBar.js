import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class NavBar extends React.Component {

	render() {
		return(
			<div className={css(styles.background)}>
				<div className={css(styles.title)}>{this.props.title}</div>

				<div className={css(styles.links)}>
					{Object.keys(this.props.links).map((k) => <div className={css(styles.singleLink)} onClick={() => this.props.links[k]()} key={k}>{k}</div>)}
				</div>
			</div>
		);
	}
}


const styles = StyleSheet.create({
	background: {
		backgroundColor: 'red',
		width: '100%',
		height: '50px',
		display: 'flex',
		alignItems: 'center',
		justifyContext: 'center',
	},
	title : {
		marginLeft: '5px',
	},
	links: {
		marginLeft: 'auto',
		display: 'flex',
	},
	singleLink: {
		marginLeft: '5px',
		marginRight: '5px',
	}
});