import { DragSource } from 'react-dnd';

const events = {
  beginDrag (props) {
    var { gobblers, coords, data } = props;
    if (gobblers && gobblers.length > 0 && coords) {
        data.update(coords, gobblers.slice(0, -1));
    }
    return {
      size: props.size,
      sizeNum: props.sizeNum,
      color: props.color,
      origin: coords
    };
  },
  endDrag(props, monitor) {
    var res = monitor.getDropResult();
    var gobbler = monitor.getItem();
    var { gobblers, coords, data } = props;
    if (res && res.moved) {
        console.log('successful move');
    } else if (coords) {
        data.update(coords, gobblers.concat(gobbler));
    }
  }
};

function mapProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource("gobbler", events, mapProps);