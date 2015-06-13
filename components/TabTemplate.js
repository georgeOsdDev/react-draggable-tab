'use strict';

import React from 'react';

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
    let css = [styles.root];
    if (!this.props.selected) {
      css.push(styles.unselected);
    }

    return (
      <div styles={css}>
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
