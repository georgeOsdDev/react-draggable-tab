'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab(props) {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Tab;
})(_react2.default.Component);

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
  tabStyles: {}
};

Tab.propTypes = {
  beforeTitle: _react2.default.PropTypes.element,
  title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]).isRequired,
  afterTitle: _react2.default.PropTypes.element,
  disableClose: _react2.default.PropTypes.bool,
  tabClassNames: _react2.default.PropTypes.shape({
    tab: _react2.default.PropTypes.string,
    tabBefore: _react2.default.PropTypes.string,
    tabAfter: _react2.default.PropTypes.string,
    tabBeforeTitle: _react2.default.PropTypes.string,
    tabTitle: _react2.default.PropTypes.string,
    tabAfterTitle: _react2.default.PropTypes.string,
    tabCloseIcon: _react2.default.PropTypes.string,
    tabActive: _react2.default.PropTypes.string,
    tabHover: _react2.default.PropTypes.string
  }),
  tabStyles: _react2.default.PropTypes.shape({
    tab: _react2.default.PropTypes.object,
    tabBefore: _react2.default.PropTypes.object,
    tabAfter: _react2.default.PropTypes.object,
    tabTitle: _react2.default.PropTypes.object,
    tabActive: _react2.default.PropTypes.object,
    tabTitleActive: _react2.default.PropTypes.object,
    tabBeforeActive: _react2.default.PropTypes.object,
    tabAfterActive: _react2.default.PropTypes.object,
    tabOnHover: _react2.default.PropTypes.object,
    tabTitleOnHover: _react2.default.PropTypes.object,
    tabBeforeOnHover: _react2.default.PropTypes.object,
    tabAfterOnHover: _react2.default.PropTypes.object,
    tabCloseIcon: _react2.default.PropTypes.object,
    tabCloseIconHover: _react2.default.PropTypes.object
  })
};

exports.default = Tab;