'use strict';
import React from 'react';
import Gobbler from './gobbler.c.js'
import Cell from './cell.c.js';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var { params, model } = this.props;
    var { boardId } = params;
    this.runner = model.board.createAutorun(boardId);
    console.log(boardId);
    console.log(this.runner);
  }
  componentDidMount() {
  }

  componentWillUnmount() {
    this.runner.stop();
  }

  render() {
    var { board, params, login } = this.props;
    console.log(board);
    console.log(login);
    if (!board) {
      return (<div></div>);
    }
    var game = board;
    board = board.board;
    var playerColor = game.red === login._id ? 'red' : game.green === login._id ? 'green' : null;
    console.log(playerColor);
    // var { boardId } = params;
    // console.log(boardId);
    // let announcement;
    // if (this.state.winner) {
    //   const msg = this.state.winner > 2 ? 'It\'s a tie!' : 'Player '+this.state.winner+' wins!';
    //   announcement = (
    //     <div className="announcement">
    //       <p>{ msg }</p>
    //       <button onClick={ this.reset.bind(this) }>Reset</button>
    //     </div>
    //   );
    // }
    const grid = board.map((row, rowInd) => {
      const cells = row.map((gobblers, cellInd) => {
        const coords = `${rowInd}_${cellInd}`;
        return ( <span key={ coords } className="cellContainer">
          <Cell gobblers={ gobblers } coords={ coords } ></Cell>
          </span> 
        )
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

    return (
      <div className="game">
        <div className="grid">
          { grid }
        </div>
        <div className="unplayedGobblers">
          <span className="unplayedGobbler"><Gobbler color={playerColor} size="small" sizeNum={1} /></span>
          <span className="unplayedGobbler"><Gobbler color={playerColor} size="medium" sizeNum={2} /></span>
          <span className="unplayedGobbler"><Gobbler color={playerColor} size="big" sizeNum={3} /></span>
        </div>
      </div>
    );
  }
}
