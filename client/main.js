'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Board from './board.c.js';
import "./main.html";
import { Router, Route, Link, browserHistory } from 'react-router';
import Login from './login.v.js';
import Leaderboard from './leaderboard.v.js';
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
import { createStore, getModel, addModel } from './reduxModel.js';
import model from './model.js';
import boardModel from './board.m.js';
import loginModel from './login.m.js';
import leaderboardModel from './leaderboard.m.js';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

var store = createStore([loginModel, leaderboardModel, boardModel]);
console.log(model);
var model2 = getModel();
console.log(model2);
// var connectModel = connect(state => Object.assign({}, state, {model}));
// Login = connectModel(Login);
// Leaderboard = connectModel(Leaderboard);
// Board = connectModel(Board);

Meteor.startup(function () {
  var id = model.board.create();
  Tracker.autorun(model.board.readAndDispatch.bind(model.board));
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

