'use strict';

import React from 'react/addons';
import classNames from 'classnames';
import TabStyles from './TabStyles';

class CloseIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleMouseOver() {
    this.setState({'hover': true});
  }

  handleMouseOut() {
    this.setState({'hover': false});
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    let iconStyle = [this.props.style];
    let className = this.props.className;
    if (this.state.hover) {
      iconStyle.push(TabStyles.tabCloseIconOnHover, this.props.hoverStyle);
      className = classNames(this.props.className, 'hover');
    }

    return (
      <span
        styles={[iconStyle]}
        className={className}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </span>
    );
  }
}

CloseIcon.defaultProps = {
  style: {},
  hoverStyle: {},
  onClick: () => {}
};

CloseIcon.propTypes = {
  style: React.PropTypes.object,
  hoverStyle: React.PropTypes.object,
  onClick: React.PropTypes.func
};

export default CloseIcon;
