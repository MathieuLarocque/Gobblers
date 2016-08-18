'use strict';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./main.html";
import { Router, Route, Link, browserHistory } from 'react-router';
import { createStore, getModel, addModel } from './reduxModel.js';
import Board from './board.c.js';
import board from './board.m.js';
import Login from './login.c.js';
import login from './login.m.js';
import Leaderboard from './leaderboard.c.js';
import leaderboard from './leaderboard.m.js';
import challenge from './challenge.m.js'
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

var model = { board, login, leaderboard, challenge };
var store = createStore(model);

Meteor.startup(function () {
  console.log(Meteor.user());
  Tracker.autorun(login.readAndDispatch);
  Tracker.autorun(board.readAndDispatch);
  Tracker.autorun(challenge.readAndDispatch);
  Tracker.autorun(leaderboard.readAndDispatch);
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
  // Tracker.autorun(function () {
  //   var me = Meteor.user();
  //   if (!(me && me._id)) {
  //     console.log('no', store);
  //     ReactDOM.render(
  //       <Provider store={store}>
  //         <Router history={browserHistory}>
  //           <Route path="*" component={ Login } />
  //         </Router>
  //       </Provider>,
  //       document.getElementById('app')
  //     );
  //   } else {
  //     console.log('yes', store);
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={ Leaderboard } />
          <Route path="/login" component={ Login } />
          <Route path="/board/:id" component={ Board } />
        </Router>
      </Provider>,
      document.getElementById('app')
    );
    // }
  // });
});

