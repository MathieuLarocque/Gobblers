'use strict';
import { Meteor } from 'meteor/meteor';
import Boards from './Boards.js'

Meteor.startup(() => {
  
  Meteor.methods({
    makeMove: function (boardId, newBoard) {
      return Boards.update(boardId, {$set: {board: newBoard}});
    },
    update: function (coords, gobblers, id) {
        var [row, col] = coords.split('_');
        var board = Boards.findOne(id).board;
        board[row][col] = gobblers;
        return Boards.update(id, {$set: {board: board}});
    },
    newBoard: function (newBoard) {
      console.log(newBoard);
      var id = Boards.insert({board: newBoard});
      console.log(id);
      return id;
    },
    createBoard: function () {
      return Boards.insert({});
    }
  });
});
