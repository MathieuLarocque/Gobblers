'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Board from './c.board.js';
import "./main.html";
import store from './store.js';
import data from './data.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import Login from './c.login.js';
import Leaderboard from './c.leaderboard.js';
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
import modelConnect from './reduxModel.js';
import model from './model.js';

Meteor.startup(function () {
  var id = model.board.Create();
  Tracker.autorun(model.board.ReadAndDispatch.bind(model.board));
  // Tracker.autorun(() => {
  //   var board = data.fetchBoard();
  //   store.dispatch({
  //     type: 'UPDATE_BOARD',
  //     board: board
  //   });
  // });
  // Tracker.autorun(() => {
  //   var challenge = data.fetchChallenges();
  //   store.dispatch({
  //     type: 'CHALLENGE',
  //     challenge: challenge
  //   });
  // });
  // Tracker.autorun(() => {
  //   var me = Meteor.userId();
  //   store.dispatch({
  //     type: 'UPDATE_ME',
  //     me: me
  //   });
  // });
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={ Login } />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/board" component={Board} />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});


