'use strict';
import React from 'react';
import { Meteor } from 'meteor/meteor';
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

export default class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    props.model.users.read()
  }

  componentWillMount() {

  }

  componentDidUpdate() {

  }

  componentDidMount() {

  }

  challenge(user) {
      function f () {
          this.props.model.challenge.create(user);
      }
      return f.bind(this);
  }

  accept() {

  }

  refuse() {

  }

  render() {
    var { model } = this.props;
    const userList = users.map((user, i) => {
        return ( <div key={ i } className="username">
                    <div>{user._id}</div>
                    <div>{user.emails[0].address}</div>
                    <button className="challengeButton" onClick={this.challenge(user._id)}>Challenge</button>
                </div> )
    });
    var pending = false;
    var challenger;
    if (challenge) {
        pending = true;
        challenger = challenge.challenger;
        console.log(challenge);
    }
    return (<div className="list">
        <div>{me}</div>
            <Modal
            isOpen={pending}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.refuse}
            style={customStyles} >

            <h2 >You have been challenged!</h2>
            <div >by {challenger}</div>
            <p>
                <button onClick={this.accept}>accept</button>
                <button onClick={this.refuse}>refuse</button>
            </p>
                
            </Modal>
        {userList}
    </div>);
  }
}
