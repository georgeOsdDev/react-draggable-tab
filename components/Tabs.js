'use strict';

import _ from 'lodash';
import React from 'react/addons';
import invariant from 'react/lib/invariant';
import classNames from 'classnames';
import Draggable from 'react-draggable';

import TabStyles from './TabStyles';
import TabTemplate from './TabTemplate';
import CloseIcon from './CloseIcon';

import StyleOverride from '../helpers/styleOverride';
import Utils from '../helpers/utils';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    let defaultState = this._tabStateFromProps(this.props);
    defaultState.selectedTab = this.props.selectedTab ? this.props.selectedTab :
                                                        this.props.tabs ? this.props.tabs[0].key : '';
    defaultState.closedTabs = [];
    this.state = defaultState;

    // Dom positons
    // do not save in state
    this.startPositions = [];
  }

  _tabStateFromProps(props) {
    let tabs = [];
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
      tabs: tabs
    };
  }

  _isClosed(key) {
    return this.state.closedTabs.indexOf(key) > -1;
  }

  _getIndexOfTabByKey(key) {
    return _.findIndex(this.state.tabs, (tab) =>{
      return tab.key === key;
    });
  }

  _getTabByKey(key) {
    return _.where(this.state.tabs, (tab) => {
      return tab.key === key;
    });
  }

  _getNextTabKey(key) {
    let nextKey;
    let current = this._getIndexOfTabByKey(key);
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
    let current = this._getIndexOfTabByKey(key);
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
    return _.filter(tabs, (tab) => {
      return !this._isClosed(tab.key);
    });
  }

  _moveTabPosition(key1, key2) {
    let t1 = this._getIndexOfTabByKey(key1);
    let t2 = this._getIndexOfTabByKey(key2);
    return Utils.slideArray(this.state.tabs, t1, t2);
  }

  _saveStartPositions() {
    let positions = _.map(this.state.tabs, (tab) => {
      let el = React.findDOMNode(this.refs[tab.key]);
      let pos = el ? el.getBoundingClientRect() : {};
      return {
        key: tab.key,
        pos: pos
      };
    });
    // Do not save in state
    this.startPositions = positions;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._saveStartPositions();
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    let newState = this._tabStateFromProps(nextProps);
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

  handleMouseDown(key, e, ui) {
  }

  handleDragStart(key, e, ui) {
  }

  handleDrag(key, e, ui) {
  }

  handleDragStop(key, e, ui) {
    const deltaX = (e.pageX || e.clientX);
    let swapedTabs;
    let newState = {};
    _.each(this.startPositions, (pos) => {
      let shoudBeSwap = key !== pos.key && pos.pos.left < deltaX && deltaX < pos.pos.right;
      if (shoudBeSwap) {
        swapedTabs = this._moveTabPosition(key, pos.key);
      }
    });
    let nextTabs = swapedTabs || this.state.tabs;

    newState.tabs = nextTabs;
    newState.selectedTab = key;
    this.setState(newState, () => {
      if(swapedTabs) {
        this.props.onTabPositionChanged(e, key, this._getOpenTabs(nextTabs));
      }
    });
  }

  handleTabClick(key, e) {
    let classes = e.target.className.split(' ');
    if (classes.indexOf('rdTabCloseIcon') > -1) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.setState({selectedTab: key}, () => {
        this.props.onTabSelected(e, key, this._getCurrentOpenTabs());
      });
    }
  }

  handleCloseButtonClick(key, e) {
    e.preventDefault();
    e.stopPropagation();
    let nextSelected;

    if (this.state.selectedTab === key) {
      nextSelected = this._getNextTabKey(key);
      if (!nextSelected) {
        nextSelected = this._getPrevTabKey(key);
      }
    } else {
      nextSelected = this.state.selectedTab;
    }

    let shoudBeNotifyTabChange = this.state.selectedTab !== nextSelected;
    this.setState({
      closedTabs: this.state.closedTabs.concat([key]),
      selectedTab: nextSelected
    }, ()=>{
      let currentOpenTabs = this._getCurrentOpenTabs();
      this.props.onTabClosed(e, key, currentOpenTabs);
      if (shoudBeNotifyTabChange) {
        this.props.onTabSelected(e, nextSelected, currentOpenTabs);
      }
    });
  }

  handleAddButtonClick(e) {
    this.props.onTabAddButtonClicked(e, this._getCurrentOpenTabs());
  }

  getCloseButton(tab, style, classes, hoverStyleBase) {
    if (tab.props.disableClose) {
      return '';
    } else {
      let onHoverStyle = StyleOverride.merge(hoverStyleBase, tab.props.tabStyles.tabCloseIconOnHover);
      return (<CloseIcon
        style={style}
        hoverStyle={onHoverStyle}
        className={classes}
        onClick={this.handleCloseButtonClick.bind(this, tab.key)}>&times;</CloseIcon>);
    }
  }

  doubleClickHandlerWithKey(key){
    return (e) => {
      this.props.onTabDoubleClicked(e, key);
    };
  }

  render() {

    // override inline tabs styles
    let tabInlineStyles = {
    };
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

    // append tabs classNames
    let tabClassNames = {
    };
    tabClassNames.tabBar = classNames('rdTabBar', this.props.tabsClassNames.tabBar);
    tabClassNames.tabBarAfter = classNames('rdTabBarAfter', this.props.tabsClassNames.tabBarAfter);
    tabClassNames.tab = classNames('rdTab', this.props.tabsClassNames.tab);
    tabClassNames.tabBefore = classNames('rdTabBefore', this.props.tabsClassNames.tabBefore);
    tabClassNames.tabAfter = classNames('rdTabAfter', this.props.tabsClassNames.tabAfter);
    tabClassNames.tabTitle = classNames('rdTabTitle', this.props.tabsClassNames.tabTitle);
    tabClassNames.tabBeforeTitle = classNames('rdTabBeforeTitle', this.props.tabsClassNames.tabBeforeTitle);
    tabClassNames.tabAfterTitle = classNames('rdTabAfterTitle', this.props.tabsClassNames.tabAfterTitle);
    tabClassNames.tabCloseIcon = classNames('rdTabCloseIcon', this.props.tabsClassNames.tabCloseIcon);
    tabClassNames.tabActive = classNames('rdTabActive', this.props.tabsClassNames.tabActive);


    let content = [];
    let tabs = _.map(this.state.tabs, (tab) => {

      if (this.state.closedTabs.indexOf(tab.key) > -1) {
        return '';
      }

      // override inline each tab styles
      let tabStyle = StyleOverride.merge(tabInlineStyles.tab, tab.props.tabStyles.tab);
      let tabBeforeStyle = StyleOverride.merge(tabInlineStyles.tabBefore, tab.props.tabStyles.tabBefore);
      let tabAfterStyle = StyleOverride.merge(tabInlineStyles.tabAfter, tab.props.tabStyles.tabAfter);
      let tabTiteleStyle = StyleOverride.merge(tabInlineStyles.tabTitle, tab.props.tabStyles.tabTitle);
      let tabCloseIconStyle = StyleOverride.merge(tabInlineStyles.tabCloseIcon, tab.props.tabStyles.tabCloseIcon);

      let tabClasses = classNames(tabClassNames.tab, tab.props.tabClassNames.tab);
      let tabBeforeClasses = classNames(tabClassNames.tabBefore, tab.props.tabClassNames.tabBefore);
      let tabAfterClasses = classNames(tabClassNames.tabAfter, tab.props.tabClassNames.tabAfter);
      let tabTitleClasses = classNames(tabClassNames.tabTitle, tab.props.tabClassNames.tabTitle);
      let tabBeforeTitleClasses = classNames(tabClassNames.tabBeforeTitle, tab.props.tabClassNames.tabBeforeTitle);
      let tabAfterTitleClasses = classNames(tabClassNames.tabAfterTitle, tab.props.tabClassNames.tabAfterTitle);
      let tabCloseIconClasses = classNames(tabClassNames.tabCloseIcon, tab.props.tabClassNames.tabCloseIcon);

      if (this.state.selectedTab === tab.key) {
        tabStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tab, tabInlineStyles.tabActive), tab.props.tabStyles.tabActive);
        tabBeforeStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabBefore, tabInlineStyles.tabBeforeActive), tab.props.tabStyles.tabBeforeActive);
        tabAfterStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabAfter, tabInlineStyles.tabAfterActive), tab.props.tabStyles.tabAfterActive);
        tabTiteleStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabTitle, tabInlineStyles.tabTitleActive), tab.props.tabStyles.tabTitleActive);
        tabClasses = classNames(tabClassNames.tab, 'rdTabActive', this.props.tabsClassNames.tabActive, tab.props.tabClassNames.tabActive);
        content.push(<TabTemplate key={'tabTemplate#' + tab.key} selected={true}>{tab}</TabTemplate>);
      } else {
        content.push(<TabTemplate key={'tabTemplate#' + tab.key} selected={false}>{tab}</TabTemplate>);
      }

      // title will be shorten with inline style
      //  {
      //    overflow: 'hidden',
      //    whiteSpace: 'nowrap',
      //    textOverflow: 'ellipsis'
      //  }
      let tabTitle = tab.props.title;
      let closeButton = this.getCloseButton(tab, tabCloseIconStyle, tabCloseIconClasses, tabInlineStyles.tabCloseIconOnHover);

      return (
        <Draggable
          key={'draggable_tabs_' + tab.key }
          axis='x'
          cancel='.rdTabCloseIcon'
          start={{x:0, y:0}}
          moveOnStartChange={true}
          zIndex={100}
          bounds='parent'
          onStart={this.handleDragStart.bind(this, tab.key)}
          onDrag={this.handleDrag.bind(this, tab.key)}
          onStop={this.handleDragStop.bind(this, tab.key)}>
          <li style={tabStyle} className={tabClasses}
              onClick={this.handleTabClick.bind(this, tab.key)}
              onMouseDown={this.handleMouseDown.bind(this, tab.key)}
              ref={tab.key}>
            <span style={TabStyles.beforeTitle} className={tabBeforeTitleClasses}>{tab.props.beforeTitle}</span>
            <p onDoubleClick={this.doubleClickHandlerWithKey(tab.key)} style={tabTiteleStyle} className={tabTitleClasses}>{tabTitle}</p>
            <span style={TabStyles.afterTitle} className={tabAfterTitleClasses}>{tab.props.afterTitle}</span>
            {closeButton}
            <span style={tabBeforeStyle} className={tabBeforeClasses}></span>
            <span style={tabAfterStyle} className={tabAfterClasses}></span>
          </li>
        </Draggable>
      );
    });

    return (
      <div style={TabStyles.wrapper}>
        <div style={TabStyles.relative}>
          <ul tabIndex='-1' style={tabInlineStyles.tabBar} className={tabClassNames.tabBar}>
            {tabs}
            <li className='rdTabAddButton' style={TabStyles.tabAddButton} onClick={this.handleAddButtonClick.bind(this)}>
              {this.props.tabAddButton}
            </li>
          </ul>
          <span style={tabInlineStyles.tabBarAfter} className={tabClassNames.tabBarAfter}></span>
        </div>
        {content}
      </div>
    );
  }
}

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
    tabActive: ''
  },
  tabsStyles: {},
  tabAddButton: (<span>{'+'}</span>),
  onTabSelected: () => {},
  onTabClosed: () => {},
  onTabAddButtonClicked: () => {},
  onTabPositionChanged: () => {},
  onTabDoubleClicked: () => {}
};

Tabs.propTypes = {
  tabs: React.PropTypes.arrayOf(React.PropTypes.element),

  selectedTab: React.PropTypes.string,
  tabsClassNames: React.PropTypes.shape({
    tabBar: React.PropTypes.string,
    tabBarAfter: React.PropTypes.string,
    tab: React.PropTypes.string,
    tabBefore: React.PropTypes.string,
    tabAfter: React.PropTypes.string,
    tabBeforeTitle: React.PropTypes.string,
    tabTitle: React.PropTypes.string,
    tabAfterTitle: React.PropTypes.string,
    tabCloseIcon: React.PropTypes.string,
    tabActive: React.PropTypes.string
  }),
  tabsStyles: React.PropTypes.shape({
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
    tabCloseIcon: React.PropTypes.object,
    tabCloseIconOnHover: React.PropTypes.object
  }),
  tabAddButton: React.PropTypes.element,
  onTabSelected: React.PropTypes.func,
  onTabClosed: React.PropTypes.func,
  onTabAddButtonClicked: React.PropTypes.func,
  onTabPositionChanged: React.PropTypes.func,
  onTabDoubleClicked: React.PropTypes.func
};

export default Tabs;
