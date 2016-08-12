'use strict';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Gobbler from './c.gobbler.js'
import Cell from './c.cell.js';
import main from './main.js';
import connectRedux from './connect.redux.js';
import modelConnect from './connect.model.js';

class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    var { board } = this.props;
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
          <span className="unplayedGobbler"><Gobbler color="green" size="small" sizeNum={1} /></span>
          <span className="unplayedGobbler"><Gobbler color="green" size="medium" sizeNum={2} /></span>
          <span className="unplayedGobbler"><Gobbler color="green" size="big" sizeNum={3} /></span>
        </div>
      </div>
    );
  }
}

// export default TicTacToe;
export default modelConnect(DragDropContext(HTML5Backend)(Board));