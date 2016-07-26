'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TicTacToe from './TicTacToe.js';
import "./main.html";
import Landing from './landing.js';
import Boards from '../common.js'

function updateBoard (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_BOARD':
      return state.concat([ action.newGobbler ])
    default:
      return state
  }
}

Meteor.startup(function () {
  var emptyBoard = [[ [], [], [] ], 
                    [ [], [], [] ], 
                    [ [], [], [] ]];
  var store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  var boardId = Boards.insert({board: emptyBoard});
  ReactDOM.render(<TicTacToe width={ 3 } boardId={ boardId } singlePlayer />, document.getElementById('app'));
  
});


