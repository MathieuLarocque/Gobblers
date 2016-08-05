import React from 'react';
import { Meteor } from 'meteor/meteor';
import Board from './board.js';
import RaisedButton from 'material-ui/RaisedButton';
import { Accounts } from 'meteor/accounts-base';
import TicTacToe from './TicTacToe.js';

'use strict';

class Landing extends React.Component {
    enter () {
        var name = this.refs.myname.value;
        var pass = this.refs.pass.value;
        Accounts.createUser({
            username: name,
            password: pass
        }, function (err) {
            if (err) {
                console.log("Couldnt create user because :", error);
            }
        });
    }
    render () {
        if (!Meteor.userId()){
            return (
                <div className="landing">
                    <h1>Gobblet gobblers</h1>
                    <p>
                    <span>Enter your name : </span>
                    <input type="text" ref="myname"/>
                    </p>
                    <p>
                    <span>Enter your password : </span>
                    <input type="password" ref="pass"/>
                    </p>
                    <p><button onClick={this.enter.bind(this)}>Enter</button></p>
                </div>
            )
        }
        else {
            var boardId = "";
            return (
                <TicTacToe width={ 3 } boardId={ boardId } singlePlayer />
            )
        }
    }
}

export default Landing;