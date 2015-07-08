'use strict';

import React from 'react';
import StyleOverride from '../helpers/styleOverride';

const styles = {
  root: {
    width: '100%',
    position: 'relative',
    textAlign: 'initial'
  },
  unselected: {
    height: '0px',
    overflow: 'hidden'
  }
};

class TabTemplate extends React.Component {

  render(){
    let style;
    if (!this.props.selected) {
      style = StyleOverride.merge(styles.root, styles.unselected);
    } else {
      style = styles.root;
    }
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

TabTemplate.defaultProps = {
  selected:false
};

TabTemplate.propTypes = {
  selected: React.PropTypes.bool.isRequired
};

export default TabTemplate;
