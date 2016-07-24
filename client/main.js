import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './TicTacToe.js';
import "./main.html";
import Landing from './landing.js';

'use strict';
Meteor.startup(function () {
  ReactDOM.render(<TicTacToe width={ 3 } boardId={ 'efioewfoi' } singlePlayer />, document.getElementById('app'));
  
});


