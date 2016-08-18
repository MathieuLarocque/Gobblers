'use strict';
import React from 'react';
import Challenge from './challenge.c.js';
import { Link, browserHistory } from 'react-router';

export default class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //   this.props.model.login.checkIfLoggedIn();
    // var { login } = this.props;
    // console.log(login);
    // if (!(login && login._id)) {
    //     browserHistory.push('/login');
    // }
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

  render() {
    var { model, leaderboard, login } = this.props;
    var me;
    if (login && login.profile && login.profile.name) {
        me = login.profile.name;
    } else if (login && login.username) {
        me = login.username;
    } else {
        var Login = model.login.getLoginComponent();
        return (<Login />);
    }
    var userList;
    if (leaderboard) {
        userList = leaderboard.map((user, i) => {
            return ( <div key={ i } className="username">
                        <div>{user._id}</div>
                        <div>{user.emails[0].address}</div>
                        <button className="challengeButton" onClick={this.challenge(user._id)}>Challenge</button>
                    </div> )
        });
    } else {
        userList = (<div>User list loading...</div>);
    }
    return (
    <div className="list">
        <div className="headerbar"><h2>{me}</h2><button className="signoutbutton">signout</button></div>
        <Challenge />
        {userList}
    </div>);
  }
}
