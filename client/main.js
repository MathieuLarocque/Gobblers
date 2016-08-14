'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./main.html";
import { Router, Route, Link, browserHistory } from 'react-router';
import { createStore, getModel, addModel } from './reduxModel.js';
import Board from './board.c.js';
import board from './board.m.js';
import Login from './login.v.js';
import login from './login.m.js';
import Leaderboard from './leaderboard.v.js';
import leaderboard from './leaderboard.m.js';
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

var model = { board, login, leaderboard };
var store = createStore(model);
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
        <Route path="/" component={ Board } />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/board" component={ Board } />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});

