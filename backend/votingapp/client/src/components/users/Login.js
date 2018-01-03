import React, {Component} from 'react';
import {css, StyleSheet} from 'aphrodite';

export default class Login extends Component {
    render() {
        return (
                <div className={css(styles.upperContainer)}>
                    <div>Username</div>
                    <input placeholder="username"></input>


                    <div>password</div>
                    <input placeholder="password"></input>

                    <button>Let me in</button>
                
                </div>
        );

    }
}

const styles = StyleSheet.create({
    upperContainer: {
        width: 200,
        height: 200,
        margin: "auto",
        marginTop: 200,
    },
});