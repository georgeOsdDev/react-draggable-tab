import React from 'react';

import PropTypes from 'prop-types';

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
  beforeTitle: <span />,
  title: 'untitled',
  afterTitle: <span />,
  unclosable: false,
  tabClassNames: {
    tab: '',
    tabBefore: '',
    tabAfter: '',
    tabTitle: '',
    tabBeforeTitle: '',
    tabAfterTitle: '',
    tabCloseIcon: '',
    tabActive: '',
    tabHover: '',
  },
  tabStyles: {},
  containerStyle: {},
};

Tab.propTypes = {
  beforeTitle: PropTypes.element,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  afterTitle: PropTypes.element,
  unclosable: PropTypes.bool,
  tabClassNames: PropTypes.shape({
    tab: PropTypes.string,
    tabBefore: PropTypes.string,
    tabAfter: PropTypes.string,
    tabBeforeTitle: PropTypes.string,
    tabTitle: PropTypes.string,
    tabAfterTitle: PropTypes.string,
    tabCloseIcon: PropTypes.string,
    tabActive: PropTypes.string,
    tabHover: PropTypes.string,
  }),
  tabStyles: PropTypes.shape({
    tab: PropTypes.object,
    tabBefore: PropTypes.object,
    tabAfter: PropTypes.object,
    tabTitle: PropTypes.object,
    tabActive: PropTypes.object,
    tabTitleActive: PropTypes.object,
    tabBeforeActive: PropTypes.object,
    tabAfterActive: PropTypes.object,
    tabOnHover: PropTypes.object,
    tabTitleOnHover: PropTypes.object,
    tabBeforeOnHover: PropTypes.object,
    tabAfterOnHover: PropTypes.object,
    tabCloseIcon: PropTypes.object,
    tabCloseIconHover: PropTypes.object,
  }),
  containerStyle: PropTypes.object,
  hiddenContainerStyle: PropTypes.object,
};

export default Tab;
