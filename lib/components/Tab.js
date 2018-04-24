'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab(props) {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

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
}(_react2.default.Component);

Tab.defaultProps = {
  beforeTitle: _react2.default.createElement('span', null),
  title: 'untitled',
  afterTitle: _react2.default.createElement('span', null),
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
    tabHover: ''
  },
  tabStyles: {},
  containerStyle: {}
};

Tab.propTypes = {
  beforeTitle: _propTypes2.default.element,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  afterTitle: _propTypes2.default.element,
  unclosable: _propTypes2.default.bool,
  tabClassNames: _propTypes2.default.shape({
    tab: _propTypes2.default.string,
    tabBefore: _propTypes2.default.string,
    tabAfter: _propTypes2.default.string,
    tabBeforeTitle: _propTypes2.default.string,
    tabTitle: _propTypes2.default.string,
    tabAfterTitle: _propTypes2.default.string,
    tabCloseIcon: _propTypes2.default.string,
    tabActive: _propTypes2.default.string,
    tabHover: _propTypes2.default.string
  }),
  tabStyles: _propTypes2.default.shape({
    tab: _propTypes2.default.object,
    tabBefore: _propTypes2.default.object,
    tabAfter: _propTypes2.default.object,
    tabTitle: _propTypes2.default.object,
    tabActive: _propTypes2.default.object,
    tabTitleActive: _propTypes2.default.object,
    tabBeforeActive: _propTypes2.default.object,
    tabAfterActive: _propTypes2.default.object,
    tabOnHover: _propTypes2.default.object,
    tabTitleOnHover: _propTypes2.default.object,
    tabBeforeOnHover: _propTypes2.default.object,
    tabAfterOnHover: _propTypes2.default.object,
    tabCloseIcon: _propTypes2.default.object,
    tabCloseIconHover: _propTypes2.default.object
  }),
  containerStyle: _propTypes2.default.object,
  hiddenContainerStyle: _propTypes2.default.object
};

exports.default = Tab;