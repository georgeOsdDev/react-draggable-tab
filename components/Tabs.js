'use strict';

import _ from 'lodash';
import React from 'react/addons';
import classNames from 'classnames';
import Draggable from 'react-draggable';

import TabStyles from './TabStyles';
import CloseIcon from './CloseIcon';


import StyleOverride from '../helpers/styleOverride';


let tabInlineStyles = {
};

let tabClassNames = {
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    // setDefaultSelected
    let selectedTab = this.props.selectedTab ? this.props.selectedTab : this.props.tabs[0].key;
    let tabPositions = {};
    let tabs = [];
    let idx = 0;
    React.Children.forEach(this.props.tabs, (tab) => {
      tabPositions[tab.key] = {x:0, y:0};
      tabs[idx] = tab;
      idx++;
    });

    this.state = {
      selectedTab: selectedTab,
      closedTabs: [],
      tabs: tabs,
      tabPositions: tabPositions,
      dragging: false
    };

    // not save in state
    this.startPositions = [];
    this.nextOrder = [];
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
      if (this.state.closedTabs.indexOf(nextKey) > -1) {
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
      if (this.state.closedTabs.indexOf(prevKey) > -1) {
        prevKey = this._getPrevTabKey(prevKey);
      }
    }
    return prevKey;
  }

  _getCurrentOpenTabs() {
    let that = this;
    return _.filter(this.state.tabs, (tab) => {
      return that.state.closedTabs.indexOf[tab.key] !== -1;
    });
  }

  _moveTabPosition(key1, key2) {
    let t1 = this._getIndexOfTabByKey(key1);
    let t2 = this._getIndexOfTabByKey(key2);
    return this._slide(this.state.tabs, t1, t2);
  }


  _slide(array, a, b) {
    let retArr;
    let _array = array.slice(0);

    if (a < b) {
      retArr = _array.map((v, idx) => {
        if (idx < a) {
          return v;
        } else if (a <= idx && idx < b) {
          return array[idx + 1];
        } else if (idx === b) {
          return array[a];
        } else {
          return v;
        }
      });
    } else {
      retArr = _array.map((v, idx) => {
        if (idx < b) {
          return v;
        } else if (b === idx) {
          return array[a];
        } else if (b < idx && idx <= a) {
          return array[idx - 1];
        } else {
          return v;
        }
      });
    }
    return retArr;
  }

  componentWillMount() {

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    let tabPositions = {};
    let tabs = [];
    let idx = 0;
    React.Children.forEach(nextProps.tabs, (tab) => {
      tabPositions[tab.key] = {x:0, y:0};
      tabs[idx] = tab;
      idx++;
    });

    let newState = {
      tabs: tabs,
      tabPositions: tabPositions
    };
    if (nextProps.selectedTab !== 'undefined') {
      newState.selectedTab = nextProps.selectedTab;
    }
    this.setState(newState);
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    let positions = _.map(this.state.tabs, (tab) => {
      let el = React.findDOMNode(this.refs[tab.key]);
      let pos = el ? el.getBoundingClientRect() : {};
      return {
        key: tab.key,
        pos: pos
      };
    });
    this.startPositions = positions;
  }

  handleMouseDown(key, e) {
    this.setState({dragging: key});
  }

  handleDragStart(key, e) {
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
    this.setState({tabPositons:tabPositions, dragging:false, tabs: nextTabs, selectedTab: key});
  }

  handleTabClick(key, e) {
    let classes = e.target.className.split(' ');
    if (classes.indexOf('rdTabCloseIcon') > -1) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.setState({selectedTab: key});
      this.props.onTabSelected(key, this._getCurrentOpenTabs());
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

    this.setState({
      closedTabs: this.state.closedTabs.concat([key]),
      selectedTab: nextSelected
      });
    this.props.onTabClosed(key, this._getCurrentOpenTabs());
  }

  handleAddButtonClick() {
    this.props.onTabAddButtonClicked(this._getCurrentOpenTabs());
  }

  getCloseButton(tab) {
    if (tab.props.disableClose) {
      return '';
    } else {
      return (<CloseIcon style={tabInlineStyles.tabCloseIcon} className={tabClassNames.tabCloseIcon} onClick={this.handleCloseButtonClick.bind(this, tab.key)}>&times;</CloseIcon>);
    }
  }

  render() {

    // override inline styles
    tabInlineStyles.tabBar = StyleOverride.merge(TabStyles.tabBar, this.props.tabStyles.tabBar);
    tabInlineStyles.tabBarAfter = StyleOverride.merge(TabStyles.tabBarAfter, this.props.tabStyles.tabBarAfter);
    tabInlineStyles.tab = StyleOverride.merge(TabStyles.tab, this.props.tabStyles.tab);
    tabInlineStyles.tabBefore = StyleOverride.merge(TabStyles.tabBefore, this.props.tabStyles.tabBefore);
    tabInlineStyles.tabAfter = StyleOverride.merge(TabStyles.tabAfter, this.props.tabStyles.tabAfter);
    tabInlineStyles.tabActive = StyleOverride.merge(TabStyles.tabActive, this.props.tabStyles.tabActive);
    tabInlineStyles.tabTitle = StyleOverride.merge(TabStyles.tabTitle, this.props.tabStyles.tabTitle);
    tabInlineStyles.tabTitleActive = StyleOverride.merge(TabStyles.tabTitleActive, this.props.tabStyles.tabTitleActive);
    tabInlineStyles.tabCloseIcon = StyleOverride.merge(TabStyles.tabCloseIcon, this.props.tabStyles.tabCloseIcon);

    // override classNames
    tabClassNames.tabBar = classNames('rdTabBar', this.props.tabClassNames.tabBar);
    tabClassNames.tabBarAfter = classNames('rdTabBarAfter', this.props.tabClassNames.tabBarAfter);
    tabClassNames.tab = classNames('rdTab', this.props.tabClassNames.tab);
    tabClassNames.tabBefore = classNames('rdTabBefore', this.props.tabClassNames.tabBefore);
    tabClassNames.tabAfter = classNames('rdTabAfter', this.props.tabClassNames.tabAfter);
    tabClassNames.tabActive = classNames('rdTabActive', this.props.tabClassNames.tabActive);
    tabClassNames.tabTitle = classNames('rdTabTitle', this.props.tabClassNames.tabTitle);
    tabClassNames.tabTitleActive = classNames('rdTabTitleActive', this.props.tabClassNames.tabTitleActive);
    tabClassNames.tabCloseIcon = classNames('rdTabCloseIcon', this.props.tabClassNames.tabCloseIcon);


    let content;
    let tabs = _.map(this.state.tabs, (tab) => {

      if (this.state.closedTabs.indexOf(tab.key) > -1) {
        return '';
      }

      let tabStyles = [tabInlineStyles.tab];
      let tabBeforeStyles = [tabInlineStyles.tabBefore];
      let tabAfterStyles = [tabInlineStyles.tabAfter];
      let tabTiteleStyle = [tabInlineStyles.tabTitle];

      if (this.state.selectedTab === tab.key) {
        tabStyles.push(tabInlineStyles.tabActive);
        tabBeforeStyles.push(tabInlineStyles.tabActive);
        tabAfterStyles.push(tabInlineStyles.tabActive);
        tabTiteleStyle.push(tabInlineStyles.tabTitleActive);
        content = tab;
      }

      let tabTitle = tab.props.title;
      if (tabTitle.length > 15) {
        tabTitle = tabTitle.substring(0, 15) + '...';
      }

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
          onStart={this.handleDragStart.bind(this, tab.key)}
          onDrag={this.handleDrag.bind(this, tab.key)}
          onStop={this.handleDragStop.bind(this, tab.key)}>
          <li styles={tabStyles} className={tabClassNames.tab}
              onClick={this.handleTabClick.bind(this, tab.key)}
              onMouseDown={this.handleMouseDown.bind(this, tab.key)}
              ref={tab.key}>
            <span styles={tabTiteleStyle} className={tabClassNames.tabTitle}>{tabTitle}</span>
            {closeButton}
            <span styles={tabBeforeStyles} className={tabClassNames.tabBefore}></span>
            <span styles={tabAfterStyles} className={tabClassNames.tabAfter}></span>
          </li>
        </Draggable>
      );
    });

    return (
      <div>
        <div style={TabStyles.wrapper}>
          <ul tabIndex='-1' style={tabInlineStyles.tabBar} className={tabClassNames.tabBar}>
            {tabs}
            <li style={TabStyles.tabAddButton} onClick={this.handleAddButtonClick.bind(this)}>
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
    tab: '',
    tabActive: '',
    tabBefor: '',
    tabAfter: '',
    tabTitle: '',
    tabTitleActive: '',
    tabCloseIcon: ''
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
    tab:      React.PropTypes.string,
    tabActive:      React.PropTypes.string,
    tabBefor: React.PropTypes.string,
    tabAfter: React.PropTypes.string,
    tabTitle: React.PropTypes.string,
    tabTitleActive: React.PropTypes.string,
    tabCloseIcon: React.PropTypes.string
  }),
  tabStyles: React.PropTypes.shape({
    tabBar: React.PropTypes.object,
    tab:      React.PropTypes.object,
    tabActive: React.PropTypes.string,
    tabBefor: React.PropTypes.object,
    tabAfter: React.PropTypes.object,
    tabTitle: React.PropTypes.object,
    tabTitleActive: React.PropTypes.object,
    tabCloseIcon: React.PropTypes.object
  }),
  tabAddButton: React.PropTypes.element,
  onTabSelected: React.PropTypes.func,
  onTabClosed: React.PropTypes.func,
  onTabAddButtonClicked: React.PropTypes.func,
  onTabPositionChanged: React.PropTypes.func
};

export default Tabs;
