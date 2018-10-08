import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Path = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  margin-right: 5px;

  ${props => props.solid && css`
    flex-grow: 1;
  `}
`;

class Navbar extends Component {

  getBar = () => {
    const { classes } = this.props;

    if (this.props.user) { // logged in
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Path solid="true" to='/'>
                <Typography variant="h6" color="inherit">
                  Voting App
                </Typography>
              </Path>
              <Path to='/logout'>
                <Typography variant="h6" color="inherit">
                  Logout
                </Typography>
              </Path>
            </Toolbar>
          </AppBar>
        </div>
      );
    } else { // not logged in
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Path solid to='/'>
                <Typography variant="h6" color="inherit">
                  Voting App
                </Typography>
              </Path>
              <Path to='/login'>
                <Typography variant="h6" color="inherit">
                  Login
                </Typography>
              </Path>
              <Path to='/register'>
                <Typography variant="h6" color="inherit">
                  Register
                </Typography>
              </Path>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }

  render() {
    return this.getBar();
  }
}


const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
