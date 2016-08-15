import { browserHistory } from 'react-router';
import { addModel } from './reduxModel.js';
import { Meteor } from 'meteor/meteor';


var db = new Mongo.Collection("boards");
Meteor.subscribe('allBoards');

var emptyBoard = [[ [], [], [] ], 
                  [ [], [], [] ], 
                  [ [], [], [] ]];

export default { 
    id: '',
    create: function () {
        this.id = db.insert({
            board: emptyBoard, 
            player1: Meteor.userId()
        });
        this.dispatch(emptyBoard);
    },
    read: function () {
        var game = db.findOne(this.id);
        if (game && game.board) {
            return game.board;
        } else {
            return {};
        }
    },
    readAndDispatch: function () {
        var board = this.read();
        this.dispatch(board);
    },
    update: function (coords, gobblers) {
        Meteor.call('update', coords, gobblers, this.id, function () {
            console.log('update finished');
        });
    },
    remove: function () {}
};