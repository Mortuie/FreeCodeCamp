import React from 'react';
import {StyleSheet, css} from 'aphrodite';


export default class App extends React.Component {

  render() {
    return (
      <html className={css(styles.red)}></html>
    );
  }

}

const styles = StyleSheet.create({
	red: {
		backgroundColor: 'red',
	},
});

