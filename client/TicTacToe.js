import React from 'react';
import Board from './board.js';
import ai from './ai.js';
import HTML5Backend from 'react-dnd-html5-backend';
import Gobbler from './gobbler.js'
import { DragDropContext } from 'react-dnd';
import Cell from './cell.js';

'use strict';

class TicTacToe extends React.Component {

  constructor(props) {
    super(props);
    this.board = new Board(props.width);
    this.state = {player: "green", freezeBoard: false, winner: false};
  }

  nextPlayer() {
    return this.state.player === "green" ? "red" : "green";
  }

  // Place a move on the board and check for a winner.
  move(x, y, player, callback) {
    this.board.move(x, y, player);
    const winner = this.board.checkWin();

    if (winner) {
      this.setState({winner, freezeBoard: true});
    } else {
      callback();
    }
  }

  // Handle a player's move, and switch to the next player.
  playerMove(x,y,size) {
    // const [ x, y ] = event.target.dataset.cell.split('_');
    const cellEmpty = this.board.getCell(x, y) === "none";
    if (cellEmpty) {
      var gobbler = size + "_" + this.state.player;
      console.log(gobbler);
      this.move(x, y, gobbler, () => {
        if (this.props.singlePlayer) {
          this.setState({player: this.nextPlayer(), freezeBoard: true}, this.aiMove);
        } else {
          this.setState({player: this.nextPlayer()});
        }
      });
    }
  }

  // Make an AI move, with a small delay for a more natural response time.
  aiMove() {
    const [ x, y ] = ai.move(this.board, this.state.player);

    setTimeout(() => {
      this.move(x, y, this.state.player, () => {
        this.setState({player: this.nextPlayer(), freezeBoard: false});
      });
    }, 200);
  }

  // Determine which player will be the AI in single player mode,
  // and make the first move if appropriate.
  aiInit() {
    if (this.props.singlePlayer) {
      const aiPlayer = Math.floor(Math.random() * 2) + 1;
      if (aiPlayer === 1) {
        this.aiMove();
      }
    }
  }

  reset() {
    this.board = new Board(this.props.width);
    this.setState({player: "green", freezeBoard: false, winner: false});
    this.aiInit();
  }

  dropFunc (coords, size) {
    const [ x, y ] = coords.split('_');
    console.log(this.state.player);
    this.playerMove(x, y, size);
    // console.log(this.props);
    // console.log(size);
  }

  componentDidMount() {
    this.aiInit();
  }

  render() {
    const { board } = this.board;
    let announcement;

    if (this.state.winner) {
      const msg = this.state.winner > 2 ? 'It\'s a tie!' : 'Player '+this.state.winner+' wins!';
      announcement = (
        <div className="announcement">
          <p>{ msg }</p>
          <button onClick={ this.reset.bind(this) }>Reset</button>
        </div>
      );
    }

    const grid = board.map((row, rowInd) => {
      const cells = row.map((cell, cellInd) => {
        console.log(cell);
        let size;
        let clickHandler;
        if (!this.state.freezeBoard) { clickHandler = this.playerMove.bind(this); }
        const coords = `${rowInd}_${cellInd}`;
        return ( <span onClick={ clickHandler } key={ coords }>
          <Cell cell={ cell } size={ size } coords={ coords } board={ this.board } dropFunc={ this.dropFunc.bind(this) }></Cell>
          </span> 
        )
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

    return (
      <div className="game">
        <div className="grid">
          { grid }
          { announcement }
        </div>
        <Gobbler color="green" size="small"></Gobbler>
        <Gobbler color="green" size="medium"></Gobbler>
        <Gobbler color="green" size="big"></Gobbler>
        <Gobbler color="red" size="small"></Gobbler>
        <Gobbler color="red" size="medium"></Gobbler>
        <Gobbler color="red" size="big"></Gobbler>
      </div>
    );
  }
}

TicTacToe.propTypes = { width: React.PropTypes.number };
TicTacToe.defaultProps = { width: 3 };

// export default TicTacToe;
export default DragDropContext(HTML5Backend)(TicTacToe);