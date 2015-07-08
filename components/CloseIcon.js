'use strict';

import React from 'react/addons';
import classNames from 'classnames';
import TabStyles from './TabStyles';
import StyleOverride from '../helpers/styleOverride';

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

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    let iconStyle = [this.props.style];
    let className = this.props.className;
    if (this.state.hover) {
      iconStyle = StyleOverride.merge(this.props.style,
                    StyleOverride.merge(TabStyles.tabCloseIconOnHover, this.props.hoverStyle)
                  );
      className = classNames(this.props.className, 'hover');
    } else {
      iconStyle = this.props.style;
      className = this.props.className;
    }

    return (
      <span
        style={iconStyle}
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
