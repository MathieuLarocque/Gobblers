'use strict';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./main.html";
import { Router, Route, Link, browserHistory } from 'react-router';
import { model, store } from './model';
import Board from './board.c.js';
import Login from './login.c.js';
import Leaderboard from './leaderboard.c.js';
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

Meteor.startup(function () {
  Tracker.autorun(run => {
    var me = Meteor.user();
    if (me && me._id) {
      model.login.setState(me);
    } 
  });
  Tracker.autorun(run => {
    var leaderboard = Meteor.users.find().fetch();
    // browserHistory.push('/login');
    if (leaderboard.length) {
      model.leaderboard.setState(leaderboard);
    }
  });
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={ Leaderboard } />
        <Route path="/login" component={ Login } />
        <Route path="/board/:boardId" component={ Board } />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});

