var {Game} = require('./Game.js');
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3001);

var unpaired;
var users = {};
var names = [];
var games = {};
io.on('connect', function (socket) {
    // console.log('connect', socket.id);
    socket.on('disconnect', function (reason) {
        // console.log('disconnect', reason, socket.user, socket.id);
        if (socket.user && socket.user.id) {
            delete socket.user.socket;
            delete users[socket.user.id].socket;
        }
    });
    socket.on('play', function (name, userId, ack) {
        name = name || 'no name';
        userId = userId || socket.id;
        var user = users[userId] || {
            id: userId,
            name
        };
        if (user.game && user.game.winner) {
            user.game = null;
        }
        user.socket = socket;
        socket.user = user;
        if (unpaired && unpaired.name && unpaired.id && unpaired.socket) {
            if (unpaired.game && unpaired.game.winner) {
                console.log(unpaired.game.winner);
                unpaired.game = null;
            }
            user.game = unpaired.game || new Game(unpaired);
            if (user.game.state === 'OPEN') {
                user.opponent = unpaired;
                unpaired.opponent = user;
                unpaired = null;
                user.game.green = user;
                user.game.state = 'PLAYING'
            }
            socket.emit('game', {
                board: user.game.board,
                turn: user.game.turn,
                playerColor: 'green'
            });
            user.opponent.socket.emit('game', {
                board: user.game.board,
                turn: user.game.turn,
                playerColor: 'red'
            });
        } else {
            user.game = new Game(user);
            unpaired = user;
        }
        users[userId] = user;
        ack(userId);
    });
    socket.on('popGobbler', function (coords) {
        var user = socket.user;
        if (!user) {
            return null;
        }
        // var user = users[socket.user.id];
        var winningColor = user.game ? user.game.popGobbler(coords, user.id) : null;
        var game = {
            board: user.game.board,
            turn: user.game.turn
        };
        if (winningColor) {
            game.winner = {
                id: user.game[winningColor].id,
                color: winningColor,
                name: user.name
            };
        }
        socket.emit('game', game);
        user.opponent.socket.emit('game', game);
        if (user.game && user.game.winner) {
            user.game = null;
            user.opponent.game = null;
        }
        users[user.id] = user;
        // console.log(coords);
    });
    socket.on('pushGobbler', function (coords, gobblerDropped) {
        var user = socket.user;
        var winningColor = user.game ? user.game.pushGobbler(coords, gobblerDropped, user.id) : null;
        var game = {
            board: user.game.board,
            turn: user.game.turn
        };
        if (winningColor) {
            game.winner = {
                id: user.game[winningColor].id,
                color: winningColor,
                name: user.name
            };
        }
        // console.log(user.game.board, coords, gobblerDropped, user.id, user.game.red.id, user.game.green.id);
        socket.emit('game', game);
        user.opponent.socket.emit('game', game);
        if (user.game && user.game.winner) {
            user.game = null;
            user.opponent.game = null;
        }
        users[user.id] = user;
        // console.log(coords, gobblerDropped)
    });
});