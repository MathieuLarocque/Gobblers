'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Board from './c.board.js';
import "./main.html";
import store from './store.js';
import data from './data.js';

Meteor.startup(function () {
  var id = data.create();
  Tracker.autorun(() => {
    var board = data.fetchBoard();
    store.dispatch({
      type: 'UPDATE_BOARD',
      data: data,
      board: board
    });
  });
  ReactDOM.render(
    <Provider store={store}>
      <Board />
    </Provider>,
    document.getElementById('app')
  );
});


