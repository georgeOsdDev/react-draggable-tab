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
  disableClose: false,
  tabClassNames: {
    tab: '',
    tabBefore: '',
    tabAfter: '',
    tabTitle: '',
    tabBeforeTitle: '',
    tabAfterTitle: '',
    tabCloseIcon: '',
    tabActive: ''
  },
  tabStyles: {}
};

Tab.propTypes = {
  beforeTitle: React.PropTypes.element,
  title: React.PropTypes.string.isRequired,
  afterTitle: React.PropTypes.element,
  disableClose: React.PropTypes.bool,
  tabClassNames: React.PropTypes.shape({
    tab: React.PropTypes.string,
    tabBefore: React.PropTypes.string,
    tabAfter: React.PropTypes.string,
    tabTitle: React.PropTypes.string,
    tabCloseIcon: React.PropTypes.string,
    tabActive: React.PropTypes.string
  }),
  tabStyles: React.PropTypes.shape({
    tab: React.PropTypes.object,
    tabBefore: React.PropTypes.object,
    tabAfter: React.PropTypes.object,
    tabTitle: React.PropTypes.object,
    tabActive: React.PropTypes.object,
    tabTitleActive: React.PropTypes.object,
    tabBeforeActive: React.PropTypes.object,
    tabAfterActive: React.PropTypes.object,
    tabCloseIcon: React.PropTypes.object,
    tabCloseIconHover: React.PropTypes.object
  })
};

export default Tab;
