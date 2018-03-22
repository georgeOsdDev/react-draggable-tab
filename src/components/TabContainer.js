import React from 'react';
import PropTypes from 'prop-types';
import StyleOverride from '../helpers/styleOverride';

const styles = {
  root: {
    width: '100%',
    position: 'relative',
    textAlign: 'initial',
  },
};

class TabContainer extends React.Component {
  render() {
    let style = StyleOverride.merge(styles.root, this.props.style);
    if (!this.props.selected) {
      style = StyleOverride.merge(styles.root, this.props.hiddenStyle);
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
  hiddenStyle: {
    height: '0px',
    overflow: 'hidden',
  },
};

TabContainer.propTypes = {
  selected: PropTypes.bool.isRequired,
  style: PropTypes.object,
  hiddenStyle: PropTypes.object,
};

export default TabContainer;
