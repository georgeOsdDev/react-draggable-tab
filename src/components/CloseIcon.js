import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TabStyles from './TabStyles';
import StyleOverride from '../helpers/styleOverride';

class CloseIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    let iconStyle = this.props.style;
    let { className } = this.props;
    if (this.state.hover) {
      iconStyle = StyleOverride.merge(
        this.props.style,
        StyleOverride.merge(TabStyles.tabCloseIconOnHover, this.props.hoverStyle),
      );
      className = classNames(this.props.className, 'hover');
    } else {
      iconStyle = this.props.style;
    }

    return (
      <span
        style={iconStyle}
        className={className}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </span>
    );
  }
}

CloseIcon.defaultProps = {
  style: {},
  hoverStyle: {},
  onClick: () => {
  },
};

CloseIcon.propTypes = {
  style: PropTypes.object,
  hoverStyle: PropTypes.object,
  onClick: PropTypes.func,
};

export default CloseIcon;
