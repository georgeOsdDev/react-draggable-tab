'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TabStyles = require('./TabStyles');

var _TabStyles2 = _interopRequireDefault(_TabStyles);

var _styleOverride = require('../helpers/styleOverride');

var _styleOverride2 = _interopRequireDefault(_styleOverride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CloseIcon = function (_React$Component) {
  _inherits(CloseIcon, _React$Component);

  function CloseIcon(props) {
    _classCallCheck(this, CloseIcon);

    var _this = _possibleConstructorReturn(this, (CloseIcon.__proto__ || Object.getPrototypeOf(CloseIcon)).call(this, props));

    _this.state = {
      hover: false
    };
    return _this;
  }

  _createClass(CloseIcon, [{
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ hover: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ hover: false });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.props.onClick(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var iconStyle = this.props.style;
      var className = this.props.className;

      if (this.state.hover) {
        iconStyle = _styleOverride2.default.merge(this.props.style, _styleOverride2.default.merge(_TabStyles2.default.tabCloseIconOnHover, this.props.hoverStyle));
        className = (0, _classnames2.default)(this.props.className, 'hover');
      } else {
        iconStyle = this.props.style;
      }

      return _react2.default.createElement(
        'span',
        {
          style: iconStyle,
          className: className,
          onMouseEnter: this.handleMouseEnter.bind(this),
          onMouseLeave: this.handleMouseLeave.bind(this),
          onClick: this.handleClick.bind(this) },
        this.props.children
      );
    }
  }]);

  return CloseIcon;
}(_react2.default.Component);

CloseIcon.defaultProps = {
  style: {},
  hoverStyle: {},
  onClick: function onClick() {}
};

CloseIcon.propTypes = {
  style: _propTypes2.default.object,
  hoverStyle: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};

exports.default = CloseIcon;