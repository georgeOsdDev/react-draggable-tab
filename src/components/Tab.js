import React from 'react';

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
    tabActive: '',
    tabHover: ''
  },
  tabStyles: {},
  containerStyle: {}
};

Tab.propTypes = {
  beforeTitle: React.PropTypes.element,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]).isRequired,
  afterTitle: React.PropTypes.element,
  disableClose: React.PropTypes.bool,
  tabClassNames: React.PropTypes.shape({
    tab: React.PropTypes.string,
    tabBefore: React.PropTypes.string,
    tabAfter: React.PropTypes.string,
    tabBeforeTitle: React.PropTypes.string,
    tabTitle: React.PropTypes.string,
    tabAfterTitle: React.PropTypes.string,
    tabCloseIcon: React.PropTypes.string,
    tabActive: React.PropTypes.string,
    tabHover:  React.PropTypes.string
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
    tabOnHover: React.PropTypes.object,
    tabTitleOnHover: React.PropTypes.object,
    tabBeforeOnHover: React.PropTypes.object,
    tabAfterOnHover: React.PropTypes.object,
    tabCloseIcon: React.PropTypes.object,
    tabCloseIconHover: React.PropTypes.object
  }),
  containerStyle: React.PropTypes.object
};

export default Tab;
