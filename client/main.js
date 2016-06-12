import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './TicTacToe.js';
import "./main.html";

'use strict';
Meteor.startup(function () {
  ReactDOM.render(<TicTacToe width={ 3 } singlePlayer />, document.getElementById('app'));
});


