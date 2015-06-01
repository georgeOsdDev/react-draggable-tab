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

export default Tab;
