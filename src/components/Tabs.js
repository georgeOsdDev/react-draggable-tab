import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import invariant from 'invariant';
import classNames from 'classnames';
import Mousetrap from 'mousetrap';

import CustomDraggable from './CustomDraggable';
import TabStyles from './TabStyles';
import TabContainer from './TabContainer';
import CloseIcon from './CloseIcon';

import StyleOverride from '../helpers/styleOverride';
import Utils from '../helpers/utils';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const tabs = this._tabStateFromProps(this.props).tabs;
    let selectedTab = '';
    if (this.props.selectedTab) {
      selectedTab = this.props.selectedTab;
    } else if (this.props.tabs) {
      selectedTab = this.props.tabs[0].key;
    }
    const hoveredTab = '';
    const closedTabs = [];
    const defaultState = {
      tabs,
      selectedTab,
      hoveredTab,
      closedTabs,
    };

    this.state = defaultState;

    // Dom positons
    // do not save in state
    this.startPositions = [];
    this.dragging = false;
  }

  _tabStateFromProps(props) {
    const tabs = [];
    let idx = 0;
    React.Children.forEach(props.tabs, (tab) => {
      invariant(
        tab.key,
        'There should be unique key in each Tab'
      );

      tabs[idx] = tab;
      idx++;
    });

    return {
      tabs,
    };
  }

  _isClosed(key) {
    return this.state.closedTabs.indexOf(key) > -1;
  }

  _getIndexOfTabByKey(key) {
    return _.findIndex(this.state.tabs, (tab) => tab.key === key);
  }

  _getTabByKey(key) {
    return _.where(this.state.tabs, (tab) => tab.key === key);
  }

  _getNextTabKey(key) {
    let nextKey;
    const current = this._getIndexOfTabByKey(key);
    if (current + 1 < this.state.tabs.length) {
      nextKey = this.state.tabs[current + 1].key;
      if (this._isClosed(nextKey)) {
        nextKey = this._getNextTabKey(nextKey);
      }
    }
    return nextKey;
  }

  _getPrevTabKey(key) {
    let prevKey;
    const current = this._getIndexOfTabByKey(key);
    if (current > 0) {
      prevKey = this.state.tabs[current - 1].key;
      if (this._isClosed(prevKey)) {
        prevKey = this._getPrevTabKey(prevKey);
      }
    }
    return prevKey;
  }

  _getCurrentOpenTabs() {
    return this._getOpenTabs(this.state.tabs);
  }

  _getOpenTabs(tabs) {
    return _.filter(tabs, (tab) => !this._isClosed(tab.key));
  }

  _moveTabPosition(key1, key2) {
    const t1 = this._getIndexOfTabByKey(key1);
    const t2 = this._getIndexOfTabByKey(key2);
    return Utils.slideArray(this.state.tabs, t1, t2);
  }

  _saveStartPositions() {
    const positions = _.map(this.state.tabs, (tab) => {
      const el = ReactDom.findDOMNode(this.refs[tab.key]);
      const pos = el ? el.getBoundingClientRect() : {};
      return {
        key: tab.key,
        pos,
      };
    });
    // Do not save in state
    this.startPositions = positions;
  }

  _cancelEventSafety(e) {
    const ev = e;
    if (typeof e.preventDefault !== 'function') {
      ev.preventDefault = () => {};
    }
    if (typeof e.stopPropagation !== 'function') {
      ev.stopPropagation = () => {};
    }
    ev.preventDefault();
    ev.stopPropagation();
    return ev;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._saveStartPositions();
    this.bindShortcuts();
  }

  componentWillUnmount() {
    this.unbindShortcuts();
  }

  componentWillReceiveProps(nextProps) {
    const newState = this._tabStateFromProps(nextProps);
    if (nextProps.selectedTab !== 'undefined') {
      newState.selectedTab = nextProps.selectedTab;
    }
    // reset closedTabs, respect props from application
    newState.closedTabs = [];
    this.setState(newState);
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    this._saveStartPositions();
  }

  bindShortcuts() {
    if (this.props.shortCutKeys) {
      if (this.props.shortCutKeys.close) {
        Mousetrap.bind(this.props.shortCutKeys.close, (e) => {
          const ev = this._cancelEventSafety(e);
          if (this.state.selectedTab) {
            this.handleCloseButtonClick(this.state.selectedTab, ev);
          }
        });
      }
      if (this.props.shortCutKeys.create) {
        Mousetrap.bind(this.props.shortCutKeys.create, (e) => {
          const ev = this._cancelEventSafety(e);
          this.handleAddButtonClick(ev);
        });
      }
      if (this.props.shortCutKeys.moveRight) {
        Mousetrap.bind(this.props.shortCutKeys.moveRight, (e) => {
          const ev = this._cancelEventSafety(e);
          this.moveRight(ev);
        });
      }
      if (this.props.shortCutKeys.moveLeft) {
        Mousetrap.bind(this.props.shortCutKeys.moveLeft, (e) => {
          const ev = this._cancelEventSafety(e);
          this.moveLeft(ev);
        });
      }
    }
  }

  unbindShortcuts() {
    Mousetrap.reset();
  }

  handleDragStart() {
    this.dragging = true;
  }

  handleDrag(key, e) {
    const deltaX = (e.pageX || e.clientX);
    _.each(this.startPositions, (pos) => {
      const tempMoved = pos.moved || 0;
      const shoudBeSwap =
        key !== pos.key &&
        pos.pos.left + tempMoved < deltaX &&
        deltaX < pos.pos.right + tempMoved;
      if (shoudBeSwap) {
        const idx1 = this._getIndexOfTabByKey(key);
        const idx2 = this._getIndexOfTabByKey(pos.key);
        const minus = idx1 > idx2 ? 1 : -1;
        const movePx = (minus * (pos.pos.right - pos.pos.left)) - tempMoved;
        ReactDom.findDOMNode(this.refs[pos.key]).style.transform = `translate(${movePx}px, 0px)`;
        this.startPositions[idx2].moved = movePx;
      }
    });
  }

  handleDragStop(key, e) {
    const deltaX = (e.pageX || e.clientX);
    let swapedTabs;
    _.each(this.startPositions, (pos) => {
      const shoudBeSwap =
        key !== pos.key &&
        pos.pos.left < deltaX &&
        deltaX < pos.pos.right;
      if (shoudBeSwap) {
        swapedTabs = this._moveTabPosition(key, pos.key);
      }
      ReactDom.findDOMNode(this.refs[pos.key]).style.transform = 'translate(0px, 0px)';
    });
    const nextTabs = swapedTabs || this.state.tabs;

    const newState = {
      tabs: nextTabs,
      selectedTab: key,
    };
    this.dragging = false;
    this.setState(newState, () => {
      if (swapedTabs) {
        this.props.onTabPositionChange(e, key, this._getOpenTabs(nextTabs));
      }
    });
  }

  handleTabClick(key, e) {
    const isBehindTab = key !== this.state.selectedTab;
    const idx = this._getIndexOfTabByKey(key);
    const isDragAfter = this.startPositions[idx].moved !== 0;
    if (isBehindTab && isDragAfter && this.props.keepSelectedTab) {
      e.preventDefault();
      return;
    }

    const classes = (e.target.getAttribute('class') || '').split(' ');
    if (classes.indexOf('rdTabCloseIcon') > -1) {
      this._cancelEventSafety(e);
    } else {
      this.setState({ selectedTab: key }, () => {
        this.props.onTabSelect(e, key, this._getCurrentOpenTabs());
      });
    }
  }

  handleMouseEnter(key, onMouseEnter, e) {
    if (!this.dragging) {
      this.setState({
        hoveredTab: key,
      }, () => {
        if (_.isFunction(onMouseEnter)) {
          onMouseEnter(e);
        }
      });
    }
  }

  handleMouseLeave(key, onMouseLeave, e) {
    if (!this.dragging) {
      if (this.state.hoveredTab === key) {
        this.setState({
          hoveredTab: '',
        }, () => {
          if (_.isFunction(onMouseLeave)) {
            onMouseLeave(e);
          }
        });
      } else {
        if (_.isFunction(onMouseLeave)) {
          onMouseLeave(e);
        }
      }
    }
  }

  handleCloseButtonClick(key, e) {
    const ev = this._cancelEventSafety(e);
    const doClose = () => {
      let nextSelected;

      if (this.state.selectedTab === key) {
        nextSelected = this._getNextTabKey(key);
        if (!nextSelected) {
          nextSelected = this._getPrevTabKey(key);
        }
      } else {
        nextSelected = this.state.selectedTab;
      }

      const shoudBeNotifyTabChange = this.state.selectedTab !== nextSelected;
      this.setState({
        closedTabs: this.state.closedTabs.concat([key]),
        selectedTab: nextSelected,
      }, () => {
        const currentOpenTabs = this._getCurrentOpenTabs();
        this.props.onTabClose(ev, key, currentOpenTabs);
        if (shoudBeNotifyTabChange) {
          this.props.onTabSelect(ev, nextSelected, currentOpenTabs);
        }
      });
    };
    if (this.props.shouldTabClose(ev, key)) {
      doClose();
    }
  }

  handleAddButtonClick(e) {
    this.props.onTabAddButtonClick(e, this._getCurrentOpenTabs());
  }

  moveRight(e) {
    let nextSelected = this._getNextTabKey(this.state.selectedTab);
    if (!nextSelected) {
      nextSelected = this.props.tabs[0] ? this.props.tabs[0].key : '';
    }
    if (nextSelected !== this.state.selectedTab) {
      this.setState({ selectedTab: nextSelected }, () => {
        this.props.onTabSelect(e, nextSelected, this._getCurrentOpenTabs());
      });
    }
  }

  moveLeft(e) {
    let nextSelected = this._getPrevTabKey(this.state.selectedTab);
    if (!nextSelected) {
      nextSelected = _.last(this.props.tabs) ? _.last(this.props.tabs).key : '';
    }
    if (nextSelected !== this.state.selectedTab) {
      this.setState({ selectedTab: nextSelected }, () => {
        this.props.onTabSelect(e, nextSelected, this._getCurrentOpenTabs());
      });
    }
  }

  getCloseButton(tab, style, classes, hoverStyleBase) {
    if (tab.props.disableClose) {
      return '';
    }
    let onHoverStyle = StyleOverride.merge(
      hoverStyleBase, tab.props.tabStyles.tabCloseIconOnHover);
    return (<CloseIcon
      style={style}
      hoverStyle={onHoverStyle}
      className={classes}
      onClick={this.handleCloseButtonClick.bind(this, tab.key)}>&times;</CloseIcon>);
  }

  render() {
    // override inline tabs styles
    const tabInlineStyles = {
    };
    tabInlineStyles.tabWrapper = StyleOverride.merge(TabStyles.tabWrapper, this.props.tabsStyles.tabWrapper);
    tabInlineStyles.tabBar = StyleOverride.merge(TabStyles.tabBar, this.props.tabsStyles.tabBar);
    tabInlineStyles.tabBarAfter = StyleOverride.merge(TabStyles.tabBarAfter, this.props.tabsStyles.tabBarAfter);
    tabInlineStyles.tab = StyleOverride.merge(TabStyles.tab, this.props.tabsStyles.tab);
    tabInlineStyles.tabBefore = StyleOverride.merge(TabStyles.tabBefore, this.props.tabsStyles.tabBefore);
    tabInlineStyles.tabAfter = StyleOverride.merge(TabStyles.tabAfter, this.props.tabsStyles.tabAfter);
    tabInlineStyles.tabTitle = StyleOverride.merge(TabStyles.tabTitle, this.props.tabsStyles.tabTitle);
    tabInlineStyles.tabCloseIcon = StyleOverride.merge(TabStyles.tabCloseIcon, this.props.tabsStyles.tabCloseIcon);
    tabInlineStyles.tabCloseIconOnHover = StyleOverride.merge(TabStyles.tabCloseIconOnHover, this.props.tabsStyles.tabCloseIconOnHover);

    tabInlineStyles.tabActive = StyleOverride.merge(TabStyles.tabActive, this.props.tabsStyles.tabActive);
    tabInlineStyles.tabTitleActive = StyleOverride.merge(TabStyles.tabTitleActive, this.props.tabsStyles.tabTitleActive);
    tabInlineStyles.tabBeforeActive = StyleOverride.merge(TabStyles.tabBeforeActive, this.props.tabsStyles.tabBeforeActive);
    tabInlineStyles.tabAfterActive = StyleOverride.merge(TabStyles.tabAfterActive, this.props.tabsStyles.tabAfterActive);

    tabInlineStyles.tabOnHover = StyleOverride.merge(TabStyles.tabOnHover, this.props.tabsStyles.tabOnHover);
    tabInlineStyles.tabTitleOnHover = StyleOverride.merge(TabStyles.tabTitleOnHover, this.props.tabsStyles.tabTitleOnHover);
    tabInlineStyles.tabBeforeOnHover = StyleOverride.merge(TabStyles.tabBeforeOnHover, this.props.tabsStyles.tabBeforeOnHover);
    tabInlineStyles.tabAfterOnHover = StyleOverride.merge(TabStyles.tabAfterOnHover, this.props.tabsStyles.tabAfterOnHover);

    // append tabs classNames
    const _tabClassNames = {
    };
    _tabClassNames.tabWrapper = classNames('rdTabWrapper', this.props.tabsClassNames.tabWrapper);
    _tabClassNames.tabBar = classNames('rdTabBar', this.props.tabsClassNames.tabBar);
    _tabClassNames.tabBarAfter = classNames('rdTabBarAfter', this.props.tabsClassNames.tabBarAfter);
    _tabClassNames.tab = classNames('rdTab', this.props.tabsClassNames.tab);
    _tabClassNames.tabBefore = classNames('rdTabBefore', this.props.tabsClassNames.tabBefore);
    _tabClassNames.tabAfter = classNames('rdTabAfter', this.props.tabsClassNames.tabAfter);
    _tabClassNames.tabTitle = classNames('rdTabTitle', this.props.tabsClassNames.tabTitle);
    _tabClassNames.tabBeforeTitle = classNames('rdTabBeforeTitle', this.props.tabsClassNames.tabBeforeTitle);
    _tabClassNames.tabAfterTitle = classNames('rdTabAfterTitle', this.props.tabsClassNames.tabAfterTitle);
    _tabClassNames.tabCloseIcon = classNames('rdTabCloseIcon', this.props.tabsClassNames.tabCloseIcon);


    let content = [];
    let tabs = _.map(this.state.tabs, (tab) => {
      if (this.state.closedTabs.indexOf(tab.key) > -1) {
        return '';
      }
      let {
        beforeTitle,
        title,
        afterTitle,
        disableClose,
        tabClassNames,
        tabStyles,
        containerStyle,
        hiddenContainerStyle,
        onClick,
        onMouseEnter,
        onMouseLeave,
        ...others
      } = tab.props;

      // override inline each tab styles
      let tabStyle = StyleOverride.merge(tabInlineStyles.tab, tabStyles.tab);
      let tabBeforeStyle = StyleOverride.merge(tabInlineStyles.tabBefore, tabStyles.tabBefore);
      let tabAfterStyle = StyleOverride.merge(tabInlineStyles.tabAfter, tabStyles.tabAfter);
      let tabTiteleStyle = StyleOverride.merge(tabInlineStyles.tabTitle, tabStyles.tabTitle);
      const tabCloseIconStyle = StyleOverride.merge(tabInlineStyles.tabCloseIcon, tabStyles.tabCloseIcon);

      let tabClasses = classNames(_tabClassNames.tab, tabClassNames.tab);
      let tabBeforeClasses = classNames(_tabClassNames.tabBefore, tabClassNames.tabBefore);
      let tabAfterClasses = classNames(_tabClassNames.tabAfter, tabClassNames.tabAfter);
      let tabTitleClasses = classNames(_tabClassNames.tabTitle, tabClassNames.tabTitle);
      let tabBeforeTitleClasses = classNames(_tabClassNames.tabBeforeTitle, tabClassNames.tabBeforeTitle);
      let tabAfterTitleClasses = classNames(_tabClassNames.tabAfterTitle, tabClassNames.tabAfterTitle);
      const tabCloseIconClasses = classNames(_tabClassNames.tabCloseIcon, tabClassNames.tabCloseIcon);

      if (this.state.selectedTab === tab.key) {
        tabStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tab, tabInlineStyles.tabActive), tabStyles.tabActive);
        tabBeforeStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabBefore, tabInlineStyles.tabBeforeActive), tabStyles.tabBeforeActive);
        tabAfterStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabAfter, tabInlineStyles.tabAfterActive), tabStyles.tabAfterActive);
        tabTiteleStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabTitle, tabInlineStyles.tabTitleActive), tabStyles.tabTitleActive);
        tabClasses = classNames(tabClasses, 'rdTabActive', this.props.tabsClassNames.tabActive, tabClassNames.tabActive);
        content.push(<TabContainer key={`tabContainer#${tab.key}`} selected={true} style={containerStyle}>{tab}</TabContainer>);
      } else {
        if (this.state.hoveredTab === tab.key) {
          tabStyle = StyleOverride.merge(StyleOverride.merge(tabStyle, tabInlineStyles.tabOnHover), tabStyles.tabOnHover);
          tabBeforeStyle = StyleOverride.merge(StyleOverride.merge(tabBeforeStyle, tabInlineStyles.tabBeforeOnHover), tabStyles.tabBeforeOnHover);
          tabAfterStyle = StyleOverride.merge(StyleOverride.merge(tabAfterStyle, tabInlineStyles.tabAfterOnHover), tabStyles.tabAfterOnHover);
          tabTiteleStyle = StyleOverride.merge(StyleOverride.merge(tabTiteleStyle, tabInlineStyles.tabTitleOnHover), tabStyles.tabTitleOnHover);
          tabClasses = classNames(tabClasses, 'rdTabHover', this.props.tabsClassNames.tabHover, tabClassNames.tabHover);
        }
        content.push(
          <TabContainer key={`tabContainer#${tab.key}`} selected={false} style={containerStyle} hiddenStyle={hiddenContainerStyle}>{tab}</TabContainer>);
      }

      // title will be shorten with inline style
      //  {
      //    overflow: 'hidden',
      //    whiteSpace: 'nowrap',
      //    textOverflow: 'ellipsis'
      //  }
      const extraAttribute = {};
      if (typeof title === 'string') {
        extraAttribute.title = title;
      }
      let closeButton = this.getCloseButton(tab, tabCloseIconStyle, tabCloseIconClasses, tabInlineStyles.tabCloseIconOnHover);

      return (
        <CustomDraggable
          key={`draggable_tabs_${tab.key}`}
          axis="x"
          cancel=".rdTabCloseIcon"
          start={{ x: 0, y: 0 }}
          moveOnStartChange={true}
          zIndex={100}
          bounds="parent"
          onStart={this.handleDragStart.bind(this, tab.key)}
          onDrag={this.handleDrag.bind(this, tab.key)}
          onStop={this.handleDragStop.bind(this, tab.key)}>
          <li style={tabStyle} className={tabClasses}
              onClick={this.handleTabClick.bind(this, tab.key)}
              onMouseEnter={this.handleMouseEnter.bind(this, tab.key, onMouseEnter)}
              onMouseLeave={this.handleMouseLeave.bind(this, tab.key, onMouseLeave)}
              ref={tab.key}
              {...others}>
            <span style={TabStyles.beforeTitle} className={tabBeforeTitleClasses}>{beforeTitle}</span>
            <p style={tabTiteleStyle}
              className={tabTitleClasses}
              {...extraAttribute} >
              {title}
            </p>
            <span style={TabStyles.afterTitle} className={tabAfterTitleClasses}>{afterTitle}</span>
            {closeButton}
            <span style={tabBeforeStyle} className={tabBeforeClasses}></span>
            <span style={tabAfterStyle} className={tabAfterClasses}></span>
          </li>
        </CustomDraggable>
      );
    });

    return (
      <div style={tabInlineStyles.tabWrapper} className={_tabClassNames.tabWrapper}>
        <ul tabIndex="-1" style={tabInlineStyles.tabBar} className={_tabClassNames.tabBar}>
          {tabs}
          <li className="rdTabAddButton" style={TabStyles.tabAddButton} onClick={this.handleAddButtonClick.bind(this)}>
            {this.props.tabAddButton}
          </li>
        </ul>
        <span style={tabInlineStyles.tabBarAfter} className={_tabClassNames.tabBarAfter}></span>
        {content}
      </div>
    );
  }
}

Tabs.defaultProps = {
  tabsClassNames: {
    tabWrapper: '',
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
    tabHover: '',
  },
  tabsStyles: {},
  shortCutKeys: {},
  tabAddButton: (<span>{'+'}</span>),
  onTabSelect: () => {},
  onTabClose: () => {},
  onTabAddButtonClick: () => {},
  onTabPositionChange: () => {},
  shouldTabClose: () => true,
  keepSelectedTab: false,
};

Tabs.propTypes = {
  tabs: React.PropTypes.arrayOf(React.PropTypes.element),

  selectedTab: React.PropTypes.string,
  tabsClassNames: React.PropTypes.shape({
    tabWrapper: React.PropTypes.string,
    tabBar: React.PropTypes.string,
    tabBarAfter: React.PropTypes.string,
    tab: React.PropTypes.string,
    tabBefore: React.PropTypes.string,
    tabAfter: React.PropTypes.string,
    tabBeforeTitle: React.PropTypes.string,
    tabTitle: React.PropTypes.string,
    tabAfterTitle: React.PropTypes.string,
    tabCloseIcon: React.PropTypes.string,
    tabActive: React.PropTypes.string,
    tabHover: React.PropTypes.string,
  }),
  tabsStyles: React.PropTypes.shape({
    tabWrapper: React.PropTypes.object,
    tabBar: React.PropTypes.object,
    tabBarAfter: React.PropTypes.object,
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
    tabCloseIconOnHover: React.PropTypes.object,
  }),
  shortCutKeys: React.PropTypes.shape({
    close: React.PropTypes.oneOfType(
      [React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
    create: React.PropTypes.oneOfType(
      [React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
    moveRight: React.PropTypes.oneOfType(
      [React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
    moveLeft: React.PropTypes.oneOfType(
      [React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
  }),
  tabAddButton: React.PropTypes.element,
  onTabSelect: React.PropTypes.func,
  onTabClose: React.PropTypes.func,
  onTabAddButtonClick: React.PropTypes.func,
  onTabPositionChange: React.PropTypes.func,
  shouldTabClose: React.PropTypes.func,
  keepSelectedTab: React.PropTypes.bool,
};

export default Tabs;
