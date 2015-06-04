'use strict';

import _ from 'lodash';
import React from 'react/addons';
import invariant from 'react/lib/invariant';
import classNames from 'classnames';
import Draggable from 'react-draggable';

import TabStyles from './TabStyles';
import CloseIcon from './CloseIcon';

import StyleOverride from '../helpers/styleOverride';
import Utils from '../helpers/utils';

let tabInlineStyles = {
};

let tabClassNames = {
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    let defaultState = this._tabStateFromProps(this.props);
    defaultState.selectedTab = this.props.selectedTab ? this.props.selectedTab :
                                                        this.props.tabs ? this.props.tabs[0].key : '';
    defaultState.closedTabs = [];
    defaultState.dragging = false;
    this.state = defaultState;

    // Dom positons
    // do not save in state
    this.startPositions = [];
  }

  _tabStateFromProps(props) {
    // setDefaultSelected
    let tabPositions = {};
    let tabs = [];
    let idx = 0;
    React.Children.forEach(props.tabs, (tab) => {

      invariant(
        tab.key,
        'There should be unique key in each Tab'
      );

      tabPositions[tab.key] = {x:0, y:0};
      tabs[idx] = tab;
      idx++;
    });

    return {
      tabs: tabs,
      tabPositions: tabPositions
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
    this.setState(newState);
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    this._saveStartPositions();
  }

  handleMouseDown(key, e, ui) {
    this.setState({dragging: key});
  }

  handleDragStart(key, e, ui) {
  }

  handleDrag(key, e, ui) {
  }

  handleDragStop(key, e, ui) {

    const deltaX = (e.pageX || e.clientX);
    let swapedTabs;
    _.each(this.startPositions, (pos) => {
      let shoudBeSwap = key !== pos.key && pos.pos.left < deltaX && deltaX < pos.pos.right;
      if (shoudBeSwap) {
        swapedTabs = this._moveTabPosition(key, pos.key);
      }
    });
    let nextTabs = swapedTabs || this.state.tabs;
    let tabPositions = this.state.tabPositions;
    tabPositions[key] = {x:0, y:0};
    this.setState({tabPositons:tabPositions, dragging:false, tabs: nextTabs, selectedTab: key}, () => {
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

  getCloseButton(tab) {
    if (tab.props.disableClose) {
      return '';
    } else {
      return (<CloseIcon
        style={tabInlineStyles.tabCloseIcon}
        hoverStyle={this.props.tabStyles.tabCloseIconHover}
        className={tabClassNames.tabCloseIcon}
        onClick={this.handleCloseButtonClick.bind(this, tab.key)}>&times;</CloseIcon>);
    }
  }

  render() {

    // override inline styles
    tabInlineStyles.tabBar = StyleOverride.merge(TabStyles.tabBar, this.props.tabStyles.tabBar);
    tabInlineStyles.tabBarAfter = StyleOverride.merge(TabStyles.tabBarAfter, this.props.tabStyles.tabBarAfter);
    tabInlineStyles.tab = StyleOverride.merge(TabStyles.tab, this.props.tabStyles.tab);
    tabInlineStyles.tabBefore = StyleOverride.merge(TabStyles.tabBefore, this.props.tabStyles.tabBefore);
    tabInlineStyles.tabAfter = StyleOverride.merge(TabStyles.tabAfter, this.props.tabStyles.tabAfter);
    tabInlineStyles.tabTitle = StyleOverride.merge(TabStyles.tabTitle, this.props.tabStyles.tabTitle);
    tabInlineStyles.tabCloseIcon = StyleOverride.merge(TabStyles.tabCloseIcon, this.props.tabStyles.tabCloseIcon);

    tabInlineStyles.tabActive = StyleOverride.merge(TabStyles.tabActive, this.props.tabStyles.tabActive);
    tabInlineStyles.tabTitleActive = StyleOverride.merge(TabStyles.tabTitleActive, this.props.tabStyles.tabTitleActive);
    tabInlineStyles.tabBeforeActive = StyleOverride.merge(TabStyles.tabBeforeActive, this.props.tabStyles.tabBeforeActive);
    tabInlineStyles.tabAfterActive = StyleOverride.merge(TabStyles.tabAfterActive, this.props.tabStyles.tabAfterActive);

    // append classNames
    tabClassNames.tabBar = classNames('rdTabBar', this.props.tabClassNames.tabBar);
    tabClassNames.tabBarAfter = classNames('rdTabBarAfter', this.props.tabClassNames.tabBarAfter);
    tabClassNames.tab = classNames('rdTab', this.props.tabClassNames.tab);
    tabClassNames.tabBefore = classNames('rdTabBefore', this.props.tabClassNames.tabBefore);
    tabClassNames.tabAfter = classNames('rdTabAfter', this.props.tabClassNames.tabAfter);
    tabClassNames.tabTitle = classNames('rdTabTitle', this.props.tabClassNames.tabTitle);
    tabClassNames.tabCloseIcon = classNames('rdTabCloseIcon', this.props.tabClassNames.tabCloseIcon);
    tabClassNames.tabActive = classNames('rdTabActive', this.props.tabClassNames.tabActive);


    let content;
    let tabs = _.map(this.state.tabs, (tab) => {

      if (this.state.closedTabs.indexOf(tab.key) > -1) {
        return '';
      }

      let tabStyle = tabInlineStyles.tab;
      let tabBeforeStyle = tabInlineStyles.tabBefore;
      let tabAfterStyle = tabInlineStyles.tabAfter;
      let tabTiteleStyle = tabInlineStyles.tabTitle;
      let tabClasses = tabClassNames.tab;

      if (this.state.selectedTab === tab.key) {
        tabStyle = StyleOverride.merge(tabInlineStyles.tab, tabInlineStyles.tabActive);
        tabBeforeStyle = StyleOverride.merge(tabInlineStyles.tabBefore, tabInlineStyles.tabBeforeActive);
        tabAfterStyle = StyleOverride.merge(tabInlineStyles.tabAfter, tabInlineStyles.tabAfterActive);
        tabTiteleStyle = StyleOverride.merge(tabInlineStyles.tabTitle, tabInlineStyles.tabTitleActive);
        tabClasses = classNames(tabClassNames.tab, 'rdTabActive', this.props.tabClassNames.tabActive);
        content = tab;
      }

      // title will be shorten with inline style
      //  {
      //    overflow: 'hidden',
      //    whiteSpace: 'nowrap',
      //    textOverflow: 'ellipsis'
      //  }
      let tabTitle = tab.props.title;
      // if (tabTitle.length > 15) {
      //   tabTitle = tabTitle.substring(0, 15) + '...';
      // }
      let tabPositon = this.state.tabPositions[tab.key];
      let closeButton = this.getCloseButton(tab);

      return (
        <Draggable
          key={'draggable_tabs_' + tab.key }
          axis='x'
          cancel='.rdTabCloseIcon'
          start={tabPositon}
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
            <span style={tabTiteleStyle} className={tabClassNames.tabTitle}>{tabTitle}</span>
            {closeButton}
            <span style={tabBeforeStyle} className={tabClassNames.tabBefore}></span>
            <span style={tabAfterStyle} className={tabClassNames.tabAfter}></span>
          </li>
        </Draggable>
      );
    });

    return (
      <div>
        <div style={TabStyles.wrapper}>
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
  tabClassNames: {
    tabBar: '',
    tabBarAfter: '',
    tab: '',
    tabBefore: '',
    tabAfter: '',
    tabTitle: '',
    tabCloseIcon: '',
    tabActive: ''
  },
  tabStyles: {},
  tabAddButton: (<span>{'+'}</span>),
  onTabSelected: () => {},
  onTabClosed: () => {},
  onTabAddButtonClicked: () => {},
  onTabPositionChanged: () => {}
};

Tabs.propTypes = {
  tabs: React.PropTypes.arrayOf(React.PropTypes.element),

  selectedTab: React.PropTypes.string,
  tabClassNames: React.PropTypes.shape({
    tabBar: React.PropTypes.string,
    tabBarAfter: React.PropTypes.string,
    tab: React.PropTypes.string,
    tabBefore: React.PropTypes.string,
    tabAfter: React.PropTypes.string,
    tabTitle: React.PropTypes.string,
    tabCloseIcon: React.PropTypes.string,
    tabActive: React.PropTypes.string
  }),
  tabStyles: React.PropTypes.shape({
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
    tabCloseIconHover: React.PropTypes.object
  }),
  tabAddButton: React.PropTypes.element,
  onTabSelected: React.PropTypes.func,
  onTabClosed: React.PropTypes.func,
  onTabAddButtonClicked: React.PropTypes.func,
  onTabPositionChanged: React.PropTypes.func
};

export default Tabs;
