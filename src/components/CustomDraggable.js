import Draggable from 'react-draggable';

class CustomDraggable extends Draggable {
  componentWillReceiveProps(nextProps) {
    const newState = {
      clientX: nextProps.start.x,
      clientY: nextProps.start.y,
    };
    this.setState(newState);
  }
}

export default CustomDraggable;
