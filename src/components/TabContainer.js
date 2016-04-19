import React from 'react';
import StyleOverride from '../helpers/styleOverride';

const styles = {
  root: {
    width: '100%',
    position: 'relative',
    textAlign: 'initial',
  },
  unselected: {
    height: '0px',
    overflow: 'hidden',
  },
};

class TabContainer extends React.Component {

  render() {
    let style = StyleOverride.merge(styles.root, this.props.style);
    if (!this.props.selected) {
      style = StyleOverride.merge(style, styles.unselected);
    }
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

TabContainer.defaultProps = {
  selected: false,
  style: {},
};

TabContainer.propTypes = {
  selected: React.PropTypes.bool.isRequired,
  style: React.PropTypes.object,
};

export default TabContainer;
