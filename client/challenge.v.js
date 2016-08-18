'use strict';
import React from 'react';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';

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

export default class Challenge extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidUpdate() {

  }

  componentDidMount() {

  }

  accept() {

  }

  refuse() {

  }

  render() {
    var { challenge, model } = this.props;
    var { accept, refuse } = model.challenge;
    challenge = challenge || {};
    return (
    <div>
        <Modal
            isOpen={challenge.pending}
            onRequestClose={refuse}
            style={customStyles} >

            <h2 >You have been challenged!</h2>
            <div >by {challenge.challenger}</div>
            <p>
                <button onClick={accept}>accept</button>
                <button onClick={refuse}>refuse</button>
            </p>
        </Modal>
    </div>);
  }
}
