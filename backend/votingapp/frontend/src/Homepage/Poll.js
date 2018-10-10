import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BASE } from '../Constants';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StyledCard = styled(Card)`
  min-width: 150px;
  min-height: 150px;
`;

const Cross = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: bold;
  cursor: pointer;
`;

class Poll extends Component {
  deletePoll = () => {
    const res = confirm('Are you sure you want to delete this poll?');

    if (res) {
      console.log('This dood wants to delete the poll');

      axios
        .delete(BASE + '/poll', {
          params: { id: this.props.data._id },
          withCredentials: true
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    const { title, _id } = this.props.data;

    return (
      <StyledCard>
        <CardContent>
          <Typography onClick={() => this.props.history.push('/poll/' + _id)}>{title}</Typography>
        </CardContent>

        {this.props.user && (
          <CardActions>
            <Button color="secondary" onClick={this.deletePoll}>
              Delete
            </Button>
          </CardActions>
        )}
      </StyledCard>
    );
  }
}

Poll.propTypes = {
  data: PropTypes.object.isRequired
};

export default withRouter(Poll);
