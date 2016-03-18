import Draggable from 'react-draggable';

class CustomDraggable extends Draggable {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    let newState =  {
      clientX: nextProps.start.x,
      clientY: nextProps.start.y
    }
    this.setState(newState);
  }
}

export default CustomDraggable;
