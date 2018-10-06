import React, { Component } from 'react';
import axios from 'axios';
import { BASE } from '../Constants';
import { Pie } from 'react-chartjs-2';
import Option from './Option';
const randomColor = require('random-color');
import { connect } from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#root')

class Votepage extends Component {
  constructor() {
    super();
    this.state = {
      poll: null,
      modalIsOpen: false,
      options: ''
    };
  }

  changeModal = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }

  getFreshState = () => {
    axios
    .get(BASE + '/poll/' + this.props.match.params.voteid)
    .then(res => this.setState({ poll: res.data.status, modalIsOpen: false, options: '' }))
    .catch(err => console.log(err));
  }

  componentWillMount() {
    this.getFreshState();
  }

  updatePoll = poll => {
    this.setState({ poll });
  }

  changeState = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  addOptions = () => {
    const options = this.state.options.split(',').map(i => { return { name: i }});

    axios.patch(BASE + '/poll', {
      id: this.props.match.params.voteid,
      options
    }, {
      withCredentials: true
    })
    .then(res => {
      if (res.data.status === "Your poll has been updated...") {
        this.getFreshState();
      }
    })
    .catch(err => console.log(err));
  }

  addPoll = () => {
    const options = this.state.options.split(',').map(i => { return { name: i }});

    axios.post(BASE + '/poll', {
      title: this.state.title,
      options,
    }, {
      withCredentials: true,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  }

  prepareData(options) {
    const data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }
      ]
    };

    for (var ele in options) {
      const color = randomColor();
      data.labels.push(options[ele].name);
      data.datasets[0].data.push(options[ele].upvotes);
      data.datasets[0].backgroundColor.push(color.hexString());
      data.datasets[0].hoverBackgroundColor.push(color.hexString());
    }

    return data;
  }


  render() {
    if (!this.state.poll) {
      return <div>Loading</div>;
    }
    const { title, options, creator, _id } = this.state.poll;
    const data = this.prepareData(options);
    return (
      <div>
        <div>
          <div>{title}</div>
          <div>{creator}</div>
          {this.props.user &&
            <button onClick={this.changeModal}>Add More Options</button>
          }
        </div>
        <Pie data={data} />
        {options.map(option => (
          <Option updatePoll={this.updatePoll} key={option._id} data={option} id={_id} />
        ))}

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.changeModal}
        >
          <div>
            <div>Adding an option</div>
            <div onClick={this.changeModal}>X</div>
          </div>
          <input name="options" placeholder="options" onChange={this.changeState} />
          <button onClick={this.addOptions}>Submit</button>
        </Modal>


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Votepage);