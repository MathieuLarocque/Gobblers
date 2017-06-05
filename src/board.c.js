import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import React from 'react';
import Gobbler from './gobbler.c.js'
import Cell from './cell.c.js';
import './style.css';

class Board extends React.Component {
  render() {
    var { board, playerColor, turn } = this.props;
    if (!board || !playerColor) {
      return (<div></div>);
    }
    

    const grid = board.map((row, rowInd) => {
      const cells = row.map((gobblers, cellInd) => {
        const coords = `${rowInd}_${cellInd}`;
        return ( <span key={ coords } className="cellContainer">
          <Cell gobblers={ gobblers } coords={ coords } playerColor={playerColor}  ></Cell>
          </span> 
        )
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });


    return (
      <div className="game">
        <div className="turn">
          <div>Turn is</div>
          <div className="turn-gobbler"><Gobbler canTake={false} color={turn.color} size="small" sizeNum={1} /></div>
        </div>
        <div className="grid">
            { grid }
        </div>
        <div className="unplayedGobblers" >
          <span className="unplayedGobbler"><Gobbler canTake={playerColor === turn.color} color={playerColor} size="small" sizeNum={1} /></span>
          <span className="unplayedGobbler"><Gobbler canTake={playerColor === turn.color} color={playerColor} size="medium" sizeNum={2} /></span>
          <span className="unplayedGobbler"><Gobbler canTake={playerColor === turn.color} color={playerColor} size="big" sizeNum={3} /></span>
        </div>
      </div>
    );
  }
}



export default DragDropContext(HTML5Backend)(Board);