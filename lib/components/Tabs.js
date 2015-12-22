'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

var _CustomDraggable = require('./CustomDraggable');

var _CustomDraggable2 = _interopRequireDefault(_CustomDraggable);

var _TabStyles = require('./TabStyles');

var _TabStyles2 = _interopRequireDefault(_TabStyles);

var _TabTemplate = require('./TabTemplate');

var _TabTemplate2 = _interopRequireDefault(_TabTemplate);

var _CloseIcon = require('./CloseIcon');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

var _styleOverride = require('../helpers/styleOverride');

var _styleOverride2 = _interopRequireDefault(_styleOverride);

var _utils = require('../helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = (function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this, props));

    var defaultState = _this._tabStateFromProps(_this.props);
    defaultState.selectedTab = _this.props.selectedTab ? _this.props.selectedTab : _this.props.tabs ? _this.props.tabs[0].key : '';
    defaultState.hoveredTab = '';
    defaultState.closedTabs = [];
    _this.state = defaultState;

    // Dom positons
    // do not save in state
    _this.startPositions = [];
    _this.dragging = false;
    return _this;
  }

  _createClass(Tabs, [{
    key: '_tabStateFromProps',
    value: function _tabStateFromProps(props) {
      var tabs = [];
      var idx = 0;
      _react2.default.Children.forEach(props.tabs, function (tab) {

        (0, _invariant2.default)(tab.key, 'There should be unique key in each Tab');

        tabs[idx] = tab;
        idx++;
      });

      return {
        tabs: tabs
      };
    }
  }, {
    key: '_isClosed',
    value: function _isClosed(key) {
      return this.state.closedTabs.indexOf(key) > -1;
    }
  }, {
    key: '_getIndexOfTabByKey',
    value: function _getIndexOfTabByKey(key) {
      return _lodash2.default.findIndex(this.state.tabs, function (tab) {
        return tab.key === key;
      });
    }
  }, {
    key: '_getTabByKey',
    value: function _getTabByKey(key) {
      return _lodash2.default.where(this.state.tabs, function (tab) {
        return tab.key === key;
      });
    }
  }, {
    key: '_getNextTabKey',
    value: function _getNextTabKey(key) {
      var nextKey = undefined;
      var current = this._getIndexOfTabByKey(key);
      if (current + 1 < this.state.tabs.length) {
        nextKey = this.state.tabs[current + 1].key;
        if (this._isClosed(nextKey)) {
          nextKey = this._getNextTabKey(nextKey);
        }
      }
      return nextKey;
    }
  }, {
    key: '_getPrevTabKey',
    value: function _getPrevTabKey(key) {
      var prevKey = undefined;
      var current = this._getIndexOfTabByKey(key);
      if (current > 0) {
        prevKey = this.state.tabs[current - 1].key;
        if (this._isClosed(prevKey)) {
          prevKey = this._getPrevTabKey(prevKey);
        }
      }
      return prevKey;
    }
  }, {
    key: '_getCurrentOpenTabs',
    value: function _getCurrentOpenTabs() {
      return this._getOpenTabs(this.state.tabs);
    }
  }, {
    key: '_getOpenTabs',
    value: function _getOpenTabs(tabs) {
      var _this2 = this;

      return _lodash2.default.filter(tabs, function (tab) {
        return !_this2._isClosed(tab.key);
      });
    }
  }, {
    key: '_moveTabPosition',
    value: function _moveTabPosition(key1, key2) {
      var t1 = this._getIndexOfTabByKey(key1);
      var t2 = this._getIndexOfTabByKey(key2);
      return _utils2.default.slideArray(this.state.tabs, t1, t2);
    }
  }, {
    key: '_saveStartPositions',
    value: function _saveStartPositions() {
      var _this3 = this;

      var positions = _lodash2.default.map(this.state.tabs, function (tab) {
        var el = _reactDom2.default.findDOMNode(_this3.refs[tab.key]);
        var pos = el ? el.getBoundingClientRect() : {};
        return {
          key: tab.key,
          pos: pos
        };
      });
      // Do not save in state
      this.startPositions = positions;
    }
  }, {
    key: '_cancelEventSafety',
    value: function _cancelEventSafety(e) {
      if (typeof e.preventDefault !== 'function') {
        e.preventDefault = function () {};
      }
      if (typeof e.stopPropagation !== 'function') {
        e.stopPropagation = function () {};
      }
      e.preventDefault();
      e.stopPropagation();
      return e;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._saveStartPositions();
      this.bindShortcuts();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindShortcuts();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var newState = this._tabStateFromProps(nextProps);
      if (nextProps.selectedTab !== 'undefined') {
        newState.selectedTab = nextProps.selectedTab;
      }
      // reset closedTabs, respect props from application
      newState.closedTabs = [];
      this.setState(newState);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._saveStartPositions();
    }
  }, {
    key: 'bindShortcuts',
    value: function bindShortcuts() {
      var _this4 = this;

      if (this.props.shortCutKeys) {
        if (this.props.shortCutKeys.close) {
          _mousetrap2.default.bind(this.props.shortCutKeys.close, function (e) {
            e = _this4._cancelEventSafety(e);
            if (_this4.state.selectedTab) {
              _this4.handleCloseButtonClick(_this4.state.selectedTab, e);
            }
          });
        }
        if (this.props.shortCutKeys.create) {
          _mousetrap2.default.bind(this.props.shortCutKeys.create, function (e) {
            e = _this4._cancelEventSafety(e);
            _this4.handleAddButtonClick(e);
          });
        }
        if (this.props.shortCutKeys.moveRight) {
          _mousetrap2.default.bind(this.props.shortCutKeys.moveRight, function (e) {
            e = _this4._cancelEventSafety(e);
            _this4.moveRight(e);
          });
        }
        if (this.props.shortCutKeys.moveLeft) {
          _mousetrap2.default.bind(this.props.shortCutKeys.moveLeft, function (e) {
            e = _this4._cancelEventSafety(e);
            _this4.moveLeft(e);
          });
        }
      }
    }
  }, {
    key: 'unbindShortcuts',
    value: function unbindShortcuts() {
      _mousetrap2.default.reset();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(key, e, ui) {}
  }, {
    key: 'handleDragStart',
    value: function handleDragStart(key, e, ui) {
      this.dragging = true;
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(key, e, ui) {
      var _this5 = this;

      var deltaX = e.pageX || e.clientX;
      _lodash2.default.each(this.startPositions, function (pos) {
        var tempMoved = pos.moved || 0;
        var shoudBeSwap = key !== pos.key && pos.pos.left + tempMoved < deltaX && deltaX < pos.pos.right + tempMoved;
        if (shoudBeSwap) {
          var el = _reactDom2.default.findDOMNode(_this5.refs[pos.key]);
          var idx1 = _this5._getIndexOfTabByKey(key);
          var idx2 = _this5._getIndexOfTabByKey(pos.key);
          var minus = idx1 > idx2 ? 1 : -1;
          var movePx = minus * (pos.pos.right - pos.pos.left) - tempMoved;
          el.style.transform = 'translate(' + movePx + 'px, 0px)';
          _this5.startPositions[idx2].moved = movePx;
        }
      });
    }
  }, {
    key: 'handleDragStop',
    value: function handleDragStop(key, e, ui) {
      var _this6 = this;

      var deltaX = e.pageX || e.clientX;
      var swapedTabs = undefined;
      var newState = {};
      _lodash2.default.each(this.startPositions, function (pos) {
        var shoudBeSwap = key !== pos.key && pos.pos.left < deltaX && deltaX < pos.pos.right;
        if (shoudBeSwap) {
          swapedTabs = _this6._moveTabPosition(key, pos.key);
        }
        var el = _reactDom2.default.findDOMNode(_this6.refs[pos.key]);
        el.style.transform = 'translate(0px, 0px)';
      });
      var nextTabs = swapedTabs || this.state.tabs;

      newState.tabs = nextTabs;
      newState.selectedTab = key;
      this.dragging = false;
      this.setState(newState, function () {
        if (swapedTabs) {
          _this6.props.onTabPositionChange(e, key, _this6._getOpenTabs(nextTabs));
        }
      });
    }
  }, {
    key: 'handleTabClick',
    value: function handleTabClick(key, e) {
      var _this7 = this;

      var isBehindTab = key !== this.state.selectedTab;
      var idx = this._getIndexOfTabByKey(key);
      var isDragAfter = this.startPositions[idx].moved !== 0;
      if (isBehindTab && isDragAfter && this.props.keepSelectedTab) {
        e.preventDefault();
        return;
      }

      var classes = e.target.className.split(' ');
      if (classes.indexOf('rdTabCloseIcon') > -1) {
        e = this._cancelEventSafety(e);
      } else {
        this.setState({ selectedTab: key }, function () {
          _this7.props.onTabSelect(e, key, _this7._getCurrentOpenTabs());
        });
      }
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(key, e) {
      var _this8 = this;

      if (!this.dragging) {
        this.setState({
          hoveredTab: key
        }, function () {
          _this8.props.onTabMouseEnter(e, key);
        });
      }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(key, e) {
      var _this9 = this;

      if (!this.dragging) {
        if (this.state.hoveredTab === key) {
          this.setState({
            hoveredTab: ''
          }, function () {
            _this9.props.onTabMouseLeave(e, key);
          });
        } else {
          this.props.onTabMouseLeave(e, key);
        }
      }
    }
  }, {
    key: 'handleCloseButtonClick',
    value: function handleCloseButtonClick(key, e) {
      var _this10 = this;

      e = this._cancelEventSafety(e);
      var nextSelected = undefined;

      if (this.state.selectedTab === key) {
        nextSelected = this._getNextTabKey(key);
        if (!nextSelected) {
          nextSelected = this._getPrevTabKey(key);
        }
      } else {
        nextSelected = this.state.selectedTab;
      }

      var shoudBeNotifyTabChange = this.state.selectedTab !== nextSelected;
      this.setState({
        closedTabs: this.state.closedTabs.concat([key]),
        selectedTab: nextSelected
      }, function () {
        var currentOpenTabs = _this10._getCurrentOpenTabs();
        _this10.props.onTabClose(e, key, currentOpenTabs);
        if (shoudBeNotifyTabChange) {
          _this10.props.onTabSelect(e, nextSelected, currentOpenTabs);
        }
      });
    }
  }, {
    key: 'handleAddButtonClick',
    value: function handleAddButtonClick(e) {
      this.props.onTabAddButtonClick(e, this._getCurrentOpenTabs());
    }
  }, {
    key: 'moveRight',
    value: function moveRight(e) {
      var _this11 = this;

      var nextSelected = this._getNextTabKey(this.state.selectedTab);
      if (!nextSelected) {
        nextSelected = this.props.tabs[0] ? this.props.tabs[0].key : '';
      }
      if (nextSelected !== this.state.selectedTab) {
        this.setState({ selectedTab: nextSelected }, function () {
          _this11.props.onTabSelect(e, nextSelected, _this11._getCurrentOpenTabs());
        });
      }
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft(e) {
      var _this12 = this;

      var nextSelected = this._getPrevTabKey(this.state.selectedTab);
      if (!nextSelected) {
        nextSelected = _lodash2.default.last(this.props.tabs) ? _lodash2.default.last(this.props.tabs).key : '';
      }
      if (nextSelected !== this.state.selectedTab) {
        this.setState({ selectedTab: nextSelected }, function () {
          _this12.props.onTabSelect(e, nextSelected, _this12._getCurrentOpenTabs());
        });
      }
    }
  }, {
    key: 'getCloseButton',
    value: function getCloseButton(tab, style, classes, hoverStyleBase) {
      if (tab.props.disableClose) {
        return '';
      } else {
        var onHoverStyle = _styleOverride2.default.merge(hoverStyleBase, tab.props.tabStyles.tabCloseIconOnHover);
        return _react2.default.createElement(
          _CloseIcon2.default,
          {
            style: style,
            hoverStyle: onHoverStyle,
            className: classes,
            onClick: this.handleCloseButtonClick.bind(this, tab.key) },
          '×'
        );
      }
    }
  }, {
    key: 'doubleClickHandlerWithKey',
    value: function doubleClickHandlerWithKey(key) {
      var _this13 = this;

      return function (e) {
        _this13.props.onTabDoubleClick(e, key);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this14 = this;

      // override inline tabs styles
      var tabInlineStyles = {};
      tabInlineStyles.tabBar = _styleOverride2.default.merge(_TabStyles2.default.tabBar, this.props.tabsStyles.tabBar);
      tabInlineStyles.tabBarAfter = _styleOverride2.default.merge(_TabStyles2.default.tabBarAfter, this.props.tabsStyles.tabBarAfter);
      tabInlineStyles.tab = _styleOverride2.default.merge(_TabStyles2.default.tab, this.props.tabsStyles.tab);
      tabInlineStyles.tabBefore = _styleOverride2.default.merge(_TabStyles2.default.tabBefore, this.props.tabsStyles.tabBefore);
      tabInlineStyles.tabAfter = _styleOverride2.default.merge(_TabStyles2.default.tabAfter, this.props.tabsStyles.tabAfter);
      tabInlineStyles.tabTitle = _styleOverride2.default.merge(_TabStyles2.default.tabTitle, this.props.tabsStyles.tabTitle);
      tabInlineStyles.tabCloseIcon = _styleOverride2.default.merge(_TabStyles2.default.tabCloseIcon, this.props.tabsStyles.tabCloseIcon);
      tabInlineStyles.tabCloseIconOnHover = _styleOverride2.default.merge(_TabStyles2.default.tabCloseIconOnHover, this.props.tabsStyles.tabCloseIconOnHover);

      tabInlineStyles.tabActive = _styleOverride2.default.merge(_TabStyles2.default.tabActive, this.props.tabsStyles.tabActive);
      tabInlineStyles.tabTitleActive = _styleOverride2.default.merge(_TabStyles2.default.tabTitleActive, this.props.tabsStyles.tabTitleActive);
      tabInlineStyles.tabBeforeActive = _styleOverride2.default.merge(_TabStyles2.default.tabBeforeActive, this.props.tabsStyles.tabBeforeActive);
      tabInlineStyles.tabAfterActive = _styleOverride2.default.merge(_TabStyles2.default.tabAfterActive, this.props.tabsStyles.tabAfterActive);

      tabInlineStyles.tabOnHover = _styleOverride2.default.merge(_TabStyles2.default.tabOnHover, this.props.tabsStyles.tabOnHover);
      tabInlineStyles.tabTitleOnHover = _styleOverride2.default.merge(_TabStyles2.default.tabTitleOnHover, this.props.tabsStyles.tabTitleOnHover);
      tabInlineStyles.tabBeforeOnHover = _styleOverride2.default.merge(_TabStyles2.default.tabBeforeOnHover, this.props.tabsStyles.tabBeforeOnHover);
      tabInlineStyles.tabAfterOnHover = _styleOverride2.default.merge(_TabStyles2.default.tabAfterOnHover, this.props.tabsStyles.tabAfterOnHover);

      // append tabs classNames
      var tabClassNames = {};
      tabClassNames.tabBar = (0, _classnames2.default)('rdTabBar', this.props.tabsClassNames.tabBar);
      tabClassNames.tabBarAfter = (0, _classnames2.default)('rdTabBarAfter', this.props.tabsClassNames.tabBarAfter);
      tabClassNames.tab = (0, _classnames2.default)('rdTab', this.props.tabsClassNames.tab);
      tabClassNames.tabBefore = (0, _classnames2.default)('rdTabBefore', this.props.tabsClassNames.tabBefore);
      tabClassNames.tabAfter = (0, _classnames2.default)('rdTabAfter', this.props.tabsClassNames.tabAfter);
      tabClassNames.tabTitle = (0, _classnames2.default)('rdTabTitle', this.props.tabsClassNames.tabTitle);
      tabClassNames.tabBeforeTitle = (0, _classnames2.default)('rdTabBeforeTitle', this.props.tabsClassNames.tabBeforeTitle);
      tabClassNames.tabAfterTitle = (0, _classnames2.default)('rdTabAfterTitle', this.props.tabsClassNames.tabAfterTitle);
      tabClassNames.tabCloseIcon = (0, _classnames2.default)('rdTabCloseIcon', this.props.tabsClassNames.tabCloseIcon);

      var content = [];
      var tabs = _lodash2.default.map(this.state.tabs, function (tab) {

        if (_this14.state.closedTabs.indexOf(tab.key) > -1) {
          return '';
        }

        // override inline each tab styles
        var tabStyle = _styleOverride2.default.merge(tabInlineStyles.tab, tab.props.tabStyles.tab);
        var tabBeforeStyle = _styleOverride2.default.merge(tabInlineStyles.tabBefore, tab.props.tabStyles.tabBefore);
        var tabAfterStyle = _styleOverride2.default.merge(tabInlineStyles.tabAfter, tab.props.tabStyles.tabAfter);
        var tabTiteleStyle = _styleOverride2.default.merge(tabInlineStyles.tabTitle, tab.props.tabStyles.tabTitle);
        var tabCloseIconStyle = _styleOverride2.default.merge(tabInlineStyles.tabCloseIcon, tab.props.tabStyles.tabCloseIcon);

        var tabClasses = (0, _classnames2.default)(tabClassNames.tab, tab.props.tabClassNames.tab);
        var tabBeforeClasses = (0, _classnames2.default)(tabClassNames.tabBefore, tab.props.tabClassNames.tabBefore);
        var tabAfterClasses = (0, _classnames2.default)(tabClassNames.tabAfter, tab.props.tabClassNames.tabAfter);
        var tabTitleClasses = (0, _classnames2.default)(tabClassNames.tabTitle, tab.props.tabClassNames.tabTitle);
        var tabBeforeTitleClasses = (0, _classnames2.default)(tabClassNames.tabBeforeTitle, tab.props.tabClassNames.tabBeforeTitle);
        var tabAfterTitleClasses = (0, _classnames2.default)(tabClassNames.tabAfterTitle, tab.props.tabClassNames.tabAfterTitle);
        var tabCloseIconClasses = (0, _classnames2.default)(tabClassNames.tabCloseIcon, tab.props.tabClassNames.tabCloseIcon);

        if (_this14.state.selectedTab === tab.key) {
          tabStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabInlineStyles.tab, tabInlineStyles.tabActive), tab.props.tabStyles.tabActive);
          tabBeforeStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabInlineStyles.tabBefore, tabInlineStyles.tabBeforeActive), tab.props.tabStyles.tabBeforeActive);
          tabAfterStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabInlineStyles.tabAfter, tabInlineStyles.tabAfterActive), tab.props.tabStyles.tabAfterActive);
          tabTiteleStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabInlineStyles.tabTitle, tabInlineStyles.tabTitleActive), tab.props.tabStyles.tabTitleActive);
          tabClasses = (0, _classnames2.default)(tabClassNames.tab, 'rdTabActive', _this14.props.tabsClassNames.tabActive, tab.props.tabClassNames.tabActive);
          content.push(_react2.default.createElement(
            _TabTemplate2.default,
            { key: 'tabTemplate#' + tab.key, selected: true },
            tab
          ));
        } else {
          if (_this14.state.hoveredTab === tab.key) {
            tabStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabStyle, tabInlineStyles.tabOnHover), tab.props.tabStyles.tabOnHover);
            tabBeforeStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabBeforeStyle, tabInlineStyles.tabBeforeOnHover), tab.props.tabStyles.tabBeforeOnHover);
            tabAfterStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabAfterStyle, tabInlineStyles.tabAfterOnHover), tab.props.tabStyles.tabAfterOnHover);
            tabTiteleStyle = _styleOverride2.default.merge(_styleOverride2.default.merge(tabTiteleStyle, tabInlineStyles.tabTitleOnHover), tab.props.tabStyles.tabTitleOnHover);
            tabClasses = (0, _classnames2.default)(tabClasses, 'rdTabHover', _this14.props.tabsClassNames.tabHover, tab.props.tabClassNames.tabHover);
          }
          content.push(_react2.default.createElement(
            _TabTemplate2.default,
            { key: 'tabTemplate#' + tab.key, selected: false },
            tab
          ));
        }

        // title will be shorten with inline style
        //  {
        //    overflow: 'hidden',
        //    whiteSpace: 'nowrap',
        //    textOverflow: 'ellipsis'
        //  }
        var tabTitle = tab.props.title;
        var closeButton = _this14.getCloseButton(tab, tabCloseIconStyle, tabCloseIconClasses, tabInlineStyles.tabCloseIconOnHover);

        return _react2.default.createElement(
          _CustomDraggable2.default,
          {
            key: 'draggable_tabs_' + tab.key,
            axis: 'x',
            cancel: '.rdTabCloseIcon',
            start: { x: 0, y: 0 },
            moveOnStartChange: true,
            zIndex: 100,
            bounds: 'parent',
            onStart: _this14.handleDragStart.bind(_this14, tab.key),
            onDrag: _this14.handleDrag.bind(_this14, tab.key),
            onStop: _this14.handleDragStop.bind(_this14, tab.key) },
          _react2.default.createElement(
            'li',
            { style: tabStyle, className: tabClasses,
              onClick: _this14.handleTabClick.bind(_this14, tab.key),
              onMouseDown: _this14.handleMouseDown.bind(_this14, tab.key),
              onMouseEnter: _this14.handleMouseEnter.bind(_this14, tab.key),
              onMouseLeave: _this14.handleMouseLeave.bind(_this14, tab.key),
              ref: tab.key },
            _react2.default.createElement(
              'span',
              { style: _TabStyles2.default.beforeTitle, className: tabBeforeTitleClasses },
              tab.props.beforeTitle
            ),
            _react2.default.createElement(
              'p',
              { onDoubleClick: _this14.doubleClickHandlerWithKey(tab.key), style: tabTiteleStyle, className: tabTitleClasses },
              tabTitle
            ),
            _react2.default.createElement(
              'span',
              { style: _TabStyles2.default.afterTitle, className: tabAfterTitleClasses },
              tab.props.afterTitle
            ),
            closeButton,
            _react2.default.createElement('span', { style: tabBeforeStyle, className: tabBeforeClasses }),
            _react2.default.createElement('span', { style: tabAfterStyle, className: tabAfterClasses })
          )
        );
      });

      return _react2.default.createElement(
        'div',
        { style: _TabStyles2.default.wrapper },
        _react2.default.createElement(
          'div',
          { style: _TabStyles2.default.relative },
          _react2.default.createElement(
            'ul',
            { tabIndex: '-1', style: tabInlineStyles.tabBar, className: tabClassNames.tabBar },
            tabs,
            _react2.default.createElement(
              'li',
              { className: 'rdTabAddButton', style: _TabStyles2.default.tabAddButton, onClick: this.handleAddButtonClick.bind(this) },
              this.props.tabAddButton
            )
          ),
          _react2.default.createElement('span', { style: tabInlineStyles.tabBarAfter, className: tabClassNames.tabBarAfter })
        ),
        content
      );
    }
  }]);

  return Tabs;
})(_react2.default.Component);

Tabs.defaultProps = {
  tabsClassNames: {
    tabBar: '',
    tabBarAfter: '',
    tab: '',
    tabBefore: '',
    tabAfter: '',
    tabBeforeTitle: '',
    tabTitle: '',
    tabAfterTitle: '',
    tabCloseIcon: '',
    tabActive: '',
    tabHover: ''
  },
  tabsStyles: {},
  shortCutKeys: {},
  tabAddButton: _react2.default.createElement(
    'span',
    null,
    '+'
  ),
  onTabSelect: function onTabSelect() {},
  onTabClose: function onTabClose() {},
  onTabAddButtonClick: function onTabAddButtonClick() {},
  onTabPositionChange: function onTabPositionChange() {},
  onTabDoubleClick: function onTabDoubleClick() {},
  onTabMouseEnter: function onTabMouseEnter() {},
  onTabMouseLeave: function onTabMouseLeave() {},
  keepSelectedTab: false
};

Tabs.propTypes = {
  tabs: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element),

  selectedTab: _react2.default.PropTypes.string,
  tabsClassNames: _react2.default.PropTypes.shape({
    tabBar: _react2.default.PropTypes.string,
    tabBarAfter: _react2.default.PropTypes.string,
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
  tabsStyles: _react2.default.PropTypes.shape({
    tabBar: _react2.default.PropTypes.object,
    tabBarAfter: _react2.default.PropTypes.object,
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
    tabCloseIconOnHover: _react2.default.PropTypes.object
  }),
  shortCutKeys: _react2.default.PropTypes.shape({
    close: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
    create: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
    moveRight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
    moveLeft: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)])
  }),
  tabAddButton: _react2.default.PropTypes.element,
  onTabSelect: _react2.default.PropTypes.func,
  onTabClose: _react2.default.PropTypes.func,
  onTabAddButtonClick: _react2.default.PropTypes.func,
  onTabPositionChange: _react2.default.PropTypes.func,
  onTabDoubleClick: _react2.default.PropTypes.func,
  onTabMouseEnter: _react2.default.PropTypes.func,
  onTabMouseLeave: _react2.default.PropTypes.func,
  keepSelectedTab: _react2.default.PropTypes.bool
};

exports.default = Tabs;