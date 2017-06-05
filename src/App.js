import React, { Component } from 'react';
import logo from './gobblers.jpg';
import socket from './socket.js'
import Board from './board.c.js';
import './animate.css';
import './App.css';

var localName = localStorage.getItem('name');
var localUserId = localStorage.getItem('userId');
class App extends Component {
  name = '';
  state = {name: localName || '', inPlay: false};
  socket = socket.onIfMounted(this, 'game', game => this.setState(game))
  play(replay) {
    if (replay) {
      this.setState({inPlay: false, board: null})
    }
    socket.emit('play', this.state.name, localUserId, id => {
      if (id) {
        this.setState({userId: id, inPlay: true});
        localStorage.setItem('userId', id);
        localUserId = id;
      } else if (localUserId) {
        this.setState({userId: localUserId, inPlay: true});        
      } else {
        this.setState({inPlay: false}); 
      }
    });
  }
  render() {
    // console.log(this.state);
    var winner = null;
    if (this.state.winner && this.state.winner.id === localUserId) {
      winner = (<div><h2>You won</h2><button onClick={e => this.play(true)} className="play animated rubberBand">Play again</button></div>)
    } else if (this.state.winner) {
      winner = (<div><h2>You lost</h2><button onClick={e => this.play(true)} className="play animated rubberBand">Play again</button></div>)
    }
    return (
          <div className="App">
            <div className="App-header">
              <div className="name-label">
                {this.state.name ? (<div className="animated rubberBand">{this.state.name}</div>) : (
                  <span>Please enter your name</span>
                )}
              </div>
            </div>
            {winner}
            { this.state.inPlay ? (<Board board={this.state.board} playerColor={this.state.playerColor} turn={this.state.turn} />) : (
            <div className="form">
              {this.state.name ? (<button onClick={e => this.play()} className="play animated rubberBand">Play</button>) : (
                  <form onSubmit={e => {
                    e.preventDefault();
                    this.setState({name: this.name});
                    localStorage.setItem('name', this.name);
                  }} className="form-name">
                    <h2>Enter your name</h2>
                    <input onChange={e => this.name = e.target.value} className="name" placeholder="your name"/>
                    <button type="submit">Enter</button>
                  </form>
                )}
            </div>)}
            { this.state.inPlay ? this.state.board ? null : (<h2>Waiting for other player</h2>) : (
            <div className="logo  animated zoomInUp">
              {this.state.name ? <img alt="logo" onClick={e => this.play()} src={logo}/> : <img alt="logo" src={logo}/> }
            </div>)}
          </div>
    );
  }
}

export default App;


// var header = (<div><Link to='/'>Quit</Link></div>);
//     if (board.winner === login._id) {
//       header = (<h2>You won!<Link to='/'>Rematch</Link></h2>);
//     } else if (board.winner) {
//       header = (<div><h2>You lost!</h2><div><Link to='/'>Rematch</Link></div></div>);
//     }