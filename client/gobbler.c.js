import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import React from 'react';
import { model } from './model';

class Gobbler extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { isDragging, connectDragSource } = this.props;
    const classesnames = "gobbler " + this.props.size + " " + this.props.color;
    return connectDragSource(
      <div className={ classesnames }></div>
    )
  }
}


const events = {
  beginDrag (props) {
    var { gobblers, coords } = props;
    if (gobblers && gobblers.length > 0 && coords) {
        model.board.popGobbler(coords);
    }
    return {
      size: props.size,
      sizeNum: props.sizeNum,
      color: props.color
    };
  },
  endDrag(props, monitor) {
    var gobblerDropped = monitor.getItem();
    var { model, coords } = props;
    var res = monitor.getDropResult() || {};
    if (res.coords) {
      model.board.pushGobbler(res.coords, gobblerDropped);
    } else if (coords) {
      model.board.pushGobbler(coords, gobblerDropped);
    }
  },
  canDrag(props, monitor) {
    var { board, login, color } = props;
    if (board && login && color) {
      if (board.red === login._id && color === 'red') {
        return true;
      } else if (board.green === login._id && color === 'green') {
        return true;
      }
    }
  }
};

function mapProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var dnd = DragSource("gobbler", events, mapProps);

var connectRedux = connect(state => Object.assign({}, {
    board: state.board
}));

export default connectRedux(dnd(Gobbler));