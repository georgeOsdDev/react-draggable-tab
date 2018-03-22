'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styleOverride = require('../helpers/styleOverride');

var _styleOverride2 = _interopRequireDefault(_styleOverride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    width: '100%',
    position: 'relative',
    textAlign: 'initial'
  }
};

var TabContainer = function (_React$Component) {
  _inherits(TabContainer, _React$Component);

  function TabContainer() {
    _classCallCheck(this, TabContainer);

    return _possibleConstructorReturn(this, (TabContainer.__proto__ || Object.getPrototypeOf(TabContainer)).apply(this, arguments));
  }

  _createClass(TabContainer, [{
    key: 'render',
    value: function render() {
      var style = _styleOverride2.default.merge(styles.root, this.props.style);
      if (!this.props.selected) {
        style = _styleOverride2.default.merge(styles.root, this.props.hiddenStyle);
      }
      return _react2.default.createElement(
        'div',
        { style: style },
        this.props.children
      );
    }
  }]);

  return TabContainer;
}(_react2.default.Component);

TabContainer.defaultProps = {
  selected: false,
  style: {},
  hiddenStyle: {
    height: '0px',
    overflow: 'hidden'
  }
};

TabContainer.propTypes = {
  selected: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.object,
  hiddenStyle: _propTypes2.default.object
};

exports.default = TabContainer;