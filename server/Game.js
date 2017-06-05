'use strict';
var {checkwin} = require('./checkwin.js');

function emptyBoard() {
    return [[ [], [], [] ], 
            [ [], [], [] ], 
            [ [], [], [] ]];
}

exports.Game = class Game {
    constructor(user) {
        this.board = emptyBoard();
        this.red = user;
        this.green = {name: '', id: ''};
        this.turn = {id: user.id, color: 'red'};
        this.poped = null;
        this.winner = null;
        this.state = 'OPEN';
    }
    checkwin() {
        var winningColor = checkwin(this.board);
        if (winningColor === 'red') {
            this.winner = this.red;
            return winningColor;
        } else if (winningColor === 'green') {
            this.winner = this.green;
            return winningColor;
        }
    }
    changeTurn () {
        if (this.turn.color === 'green') {
            this.turn.color = 'red';
            this.turn.id = this.red.id;
        } else if (this.turn.color === 'red') {
            this.turn.color = 'green';
            this.turn.id = this.green.id;
        }
    }
    isLegalMove(userId) {
        if (this.winner) {
            return false;
        }
        if (this.turn.id === userId) {
            if (this.red.id === userId && this.turn.color === 'red') {
                return true;
            } else if (this.green.id === userId && this.turn.color === 'green') {
                return true;
            }
        }
        return false;
    }
    pushGobbler (coords, gobbler, userId) {
        if (!this.isLegalMove(userId)) {
            return null;
        }
        var [row, col] = coords.split('_');
        // console.log('legal', this.board[row][col].length);
        if (this.board[row][col].length > 3) {
            return null;
        }
        this.board[row][col].push(gobbler);
        var winningColor = this.checkwin();
        if (winningColor) {
            return winningColor;
        } else if (this.poped && this.poped === coords) {
            this.poped = null;
        } else {
            this.poped = null;
            this.changeTurn();
        }
    }
    popGobbler (coords, userId) {
        if (!this.isLegalMove(userId)) {
            return null;
        }
        if (this.poped) {
            return null;
        }
        var [row, col] = coords.split('_');
        if (!this.board[row][col].length) {
            return null;
        }
        this.board[row][col].pop();
        this.poped = coords;
        var winningColor = this.checkwin();
        if (winningColor) {
            return winningColor;
        }
    }

}

