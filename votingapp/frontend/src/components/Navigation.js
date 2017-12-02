import React from 'react';
import {Link} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite';

export default class Navigation extends React.Component {

	getBar = () => {
		if (this.props.authenticated) {
			return (
				<div>
					<ul className={css(styles.nav)}>
						<li className={css(styles.title)}><Link className={css(styles.links)} to="/dashboard">Voting App</Link></li>	
						<li className={css(styles.listElements)}><a className={css(styles.links)}  onClick={() => this.props.signout()}>Sign out</a></li>
						<li className={css(styles.listElements)}><Link className={css(styles.links)} to="/createpoll">Create Poll</Link></li>
						<li className={css(styles.listElements)}><Link className={css(styles.links)} to="/dashboard">Dashboard</Link></li>
					</ul>
				</div>
			);
		} else { // not authenticated

			return (
				<div>
					<ul className={css(styles.nav)}>
						<li className={css(styles.title)}><Link className={css(styles.links)} to="/dashboard">Voting App</Link></li>
						<li className={css(styles.listElements)}><Link className={css(styles.links)} to="/register">Register</Link></li>
						<li className={css(styles.listElements)}><Link className={css(styles.links)} to="/dashboard">Dashboard</Link></li>
						<li className={css(styles.listElements)}><Link className={css(styles.links)} to="/login">Login</Link></li>
					</ul>	
				</div>
			);
		}
	}


	render() {

		return (this.getBar());

	}



}

const styles = StyleSheet.create({
	nav: {
		listStyleType: "none",
		margin: 0,
		padding: 0,
		overflow: "hidden",
		backgroundColor: "#333",
	},
	listElements: {
		float: "right",

	},
	title: {
		float: "left",
	},
	links: {
		display: "block",
		color: "white",
		textAlign: "center",
		padding: "14px 16px",
		textDecoration: "none",
		cursor: "pointer",
	}
});

