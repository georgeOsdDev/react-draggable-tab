'use strict';

import React from 'react/addons';
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
    if (this.state.hover) {
      iconStyle.push(TabStyles.tabCloseIconOnHover);
    }

    return (
      <span
        styles={[iconStyle]}
        className={this.props.className}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </span>
    );
  }
}

CloseIcon.defaultProps = {
  onClick: () => {}
};

CloseIcon.propTypes = {
  onClick: React.PropTypes.func
};

export default CloseIcon;
