import { DropTarget } from 'react-dnd';

const events = {
  drop(props, monitor, component) {
    var gobbler = monitor.getItem();
    var { gobblers, coords, data } = props;
    if (gobblers.length > 0) {
        var lastGobbler = gobblers[gobblers.length - 1];
        if (lastGobbler && gobbler.sizeNum > lastGobbler.sizeNum) {
            data.update(coords, gobblers.concat(gobbler));
            return {moved: true};
        }
    } else {
      data.update(coords, gobblers.concat(gobbler));
      return {moved: true};
    }
    return {moved: false};
  }
};

function mapProps(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

export default DropTarget("gobbler", events, mapProps);
