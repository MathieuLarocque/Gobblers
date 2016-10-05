import { connect } from 'react-redux';
import React from 'react';
import Challenge from './challenge.c.js';
import Login from './login.c.js';
import { Link, browserHistory } from 'react-router';
import { model } from './model';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  challenge(user) {
      function f () {
          console.log('challenging', user);
          model.challenge.create(user);
      }
      return f.bind(this);
  }

  render() {
    var { leaderboard, login } = this.props;
    var me;
    // console.log(model);
    if (login && login.profile && login.profile.name) {
        me = login.profile.name;
    } else if (login && login.username) {
        me = login.username;
    } else {
        return (<Login />);
    }
    var userList;
    if (leaderboard) {
        userList = leaderboard.map((user, i) => {
            return ( <div key={ i } className="username">
                        <div>{user._id}</div>
                        <div>{user.emails[0].address}</div>
                        <button className="challengeButton" onClick={e => model.challenge.create(user._id)}>Challenge</button>
                    </div> )
        });
    } else {
        userList = (<div>User list loading...</div>);
    }
    return (
    <div className="list">
        <div className="headerbar">
            <h2>{me}</h2>
            <button className="signoutbutton" onClick={model.login.signout}>signout</button>
        </div>
        <button onClick={e => model.leaderboard.quickPlay(login._id)}>Quick play</button>
        {userList}
    </div>);
  }
}

var connectRedux = connect(state => Object.assign({}, {
    leaderboard: state.leaderboard,
    login: state.login
}));

export default connectRedux(Leaderboard);