'use strict';
import React from 'react';
import Board from './board.js';
import HTML5Backend from 'react-dnd-html5-backend';
import Gobbler from './gobbler.js'
import { DragDropContext } from 'react-dnd';
import Cell from './cell.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Boards from '../common.js';

class TicTacToe extends TrackerReact(React.Component) {

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

  getBoard () {
    return Boards.findOne(this.state.boardId);
  }

  // Handle a player's move, and switch to the next player.
  playerMove(x,y,size) {
    // const [ x, y ] = event.target.dataset.cell.split('_');
    const cellEmpty = this.board.getCell(x, y) === "none";
    if (cellEmpty) {
      var gobbler = size + "_" + this.state.player;
      this.move(x, y, gobbler, () => {
        if (this.props.singlePlayer) {
          this.setState({player: this.nextPlayer(), freezeBoard: true});
        } else {
          this.setState({player: this.nextPlayer()});
        }
      });
    }
  }

  reset() {
    this.board = new Board(this.props.width);
    this.setState({player: "green", freezeBoard: false, winner: false});
  }

  dropFunc (coords, size) {
    const [ x, y ] = coords.split('_');
    this.playerMove(x, y, size);
    // console.log(this.props);
    // console.log(size);
  }

  componentDidMount() {
  }

  render() {
    const { board } = this.board;
    console.log(board);
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
        let size;
        let clickHandler;
        if (!this.state.freezeBoard) { clickHandler = this.playerMove.bind(this); }
        const coords = `${rowInd}_${cellInd}`;
        return ( <span onClick={ clickHandler } key={ coords } className="cellContainer">
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
        <div className="unplayedGobblers">
        <Gobbler color="green" size="small" sizeNum={1} ></Gobbler>
        <Gobbler color="green" size="medium" sizeNum={2} ></Gobbler>
        <Gobbler color="green" size="big" sizeNum={3} ></Gobbler>
        <Gobbler color="red" size="small" sizeNum={1} ></Gobbler>
        <Gobbler color="red" size="medium" sizeNum={2} ></Gobbler>
        <Gobbler color="red" size="big" sizeNum={3} ></Gobbler>
        </div>
      </div>
    );
  }
}

TicTacToe.propTypes = { 
  width: React.PropTypes.number 
};
TicTacToe.defaultProps = { width: 3 };

// export default TicTacToe;
export default DragDropContext(HTML5Backend)(TicTacToe);