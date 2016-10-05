import { connect } from 'react-redux';
import React from 'react';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';
import { model } from './model';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Challenge extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { challenge } = this.props;
    var { accept, refuse } = model.challenge;
    challenge = challenge || {};
    var { _id } = challenge;
    console.log(challenge);
    return (
    <div>
        <Modal
            isOpen={challenge.pending}
            onRequestClose={refuse(_id)}
            style={customStyles} >

            <h2 >You have been challenged!</h2>
            <div >by {challenge.challenger}</div>
            <p>
                <button onClick={accept(_id)}>accept</button>
                <button onClick={refuse(_id)}>refuse</button>
            </p>
        </Modal>
    </div>);
  }
}

var connectRedux = connect(state => Object.assign({}, {
    board: state.board
}));

export default connectRedux(Challenge);