'use strict';

import React from 'react/addons';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return this.props.children;
  }
}

Tab.defaultProps = {
  title: 'untitled',
  disableClose: false
};

Tab.propTypes = {
  key: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  disableClose: React.PropTypes.bool
};

export default Tab;
