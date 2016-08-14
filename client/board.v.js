'use strict';
import React from 'react';
import Gobbler from './gobbler.c.js'
import Cell from './cell.c.js';

export default class Board extends React.Component {

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
