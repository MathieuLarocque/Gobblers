import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import Gobbler from './c.gobbler.js';
import connectRedux from './connect.redux.js';
import connectDnd from './connect.dnd.cell.js';

'use strict';

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { gobblers, coords } = this.props;
    let lastGobbler = false;
    if (gobblers.length > 0) {
      lastGobbler = gobblers[gobblers.length - 1];
    }
    let lastGobblerComp;
    if (lastGobbler) {
      lastGobblerComp = (<div className="gobblercontainer" >
      <Gobbler color={lastGobbler.color} 
              size={lastGobbler.size} 
              sizeNum={lastGobbler.sizeNum}
              gobblers={gobblers}
              coords={coords}>
      </Gobbler></div> )
    }
    return this.props.connectDropTarget( 
      <div className="cell"  data-cell={ this.props.coords }>
        {lastGobblerComp}
      </div> 
    )
  }
}

Cell.propTypes = { 
    coords: React.PropTypes.string,
    cell: React.PropTypes.string,
    board: React.PropTypes.array,
    id: React.PropTypes.string
};
// Cell.defaultProps = { freezeBoard: false };


export default connectRedux(connectDnd(Cell));