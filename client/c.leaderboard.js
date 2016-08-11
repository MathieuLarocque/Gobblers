'use strict';
import React from 'react';
import connectRedux from './connect.redux.js';
import { Meteor } from 'meteor/meteor';
import Tracker from 'tracker-component';
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

class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    props.data.getUsers()
  }

  componentWillMount() {

  }

  componentDidUpdate() {

  }

  componentDidMount() {

  }

  challenge(user) {
      function f () {
          this.props.data.challenge(user);
      }
      return f.bind(this);
  }

  accept() {

  }

  refuse() {

  }
  
  render() {
    var { users, challenge, me } = this.props;
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
Leaderboard.propTypes = { 
    users: React.PropTypes.array
};
Leaderboard.defaultProps = { users: [] };
export default connectRedux(Leaderboard);