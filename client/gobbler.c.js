import { DragSource } from 'react-dnd';
import Gobbler from './gobbler.v.js';
import { connectModel } from './reduxModel.js';

const events = {
  beginDrag (props) {
    var { gobblers, coords, model } = props;
    if (gobblers && gobblers.length > 0 && coords) {
        model.board.update(coords, gobblers.slice(0, -1));
    }
    return {
      size: props.size,
      sizeNum: props.sizeNum,
      color: props.color,
      origin: coords
    };
  },
  endDrag(props, monitor) {
    var res = monitor.getDropResult() || {};
    if (!res.moved) {
        var gobbler = monitor.getItem();
        var { gobblers, coords, model } = props;
        if (coords) {
          model.board.update(coords, gobblers.concat(gobbler));
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