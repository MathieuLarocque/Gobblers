import { DragSource } from 'react-dnd';
import Gobbler from './gobbler.v.js';
import { connectModel } from './reduxModel.js';

const events = {
  beginDrag (props) {
    var { gobblers, coords, model } = props;
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
    console.log(props);
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

export default connectModel(dnd(Gobbler));