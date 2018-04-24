import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import invariant from 'invariant';
import classNames from 'classnames';
import Mousetrap from 'mousetrap';

import CustomDraggable from './CustomDraggable';
import TabStyles from './TabStyles';
import TabContainer from './TabContainer';
import CloseIcon from './CloseIcon';

import StyleOverride from '../helpers/styleOverride';
import Utils from '../helpers/utils';

function tabStateFromProps(props) {
  const tabs = [];
  let idx = 0;
  React.Children.forEach(props.tabs, (tab) => {
    invariant(
      tab.key,
      'There should be unique key in each Tab',
    );

    tabs[idx] = tab;
    idx += 1;
  });
  return { tabs };
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const { tabs } = tabStateFromProps(this.props);
    let selectedTab = '';
    if (this.props.selectedTab) {
      selectedTab = this.props.selectedTab; // eslint-disable-line prefer-destructuring
    } else if (this.props.tabs) {
      selectedTab = this.props.tabs[0].key;
    }
    const hoveredTab = '';
    const closedTabs = [];
    this.state = {
      tabs,
      selectedTab,
      hoveredTab,
      closedTabs,
    };

    // Dom positons
    // do not save in state
    this.startPositions = [];
    this.dragging = false;
  }

  isClosed(key) {
    return this.state.closedTabs.indexOf(key) > -1;
  }

  getIndexOfTabByKey(key) {
    return _.findIndex(this.state.tabs, tab => tab.key === key);
  }

  getNextTabKey(key) {
    let nextKey;
    const current = this.getIndexOfTabByKey(key);
    if (current + 1 < this.state.tabs.length) {
      nextKey = this.state.tabs[current + 1].key;
      if (this.isClosed(nextKey)) {
        nextKey = this.getNextTabKey(nextKey);
      }
    }
    return nextKey;
  }

  getPrevTabKey(key) {
    let prevKey;
    const current = this.getIndexOfTabByKey(key);
    if (current > 0) {
      prevKey = this.state.tabs[current - 1].key;
      if (this.isClosed(prevKey)) {
        prevKey = this.getPrevTabKey(prevKey);
      }
    }
    return prevKey;
  }

  getCurrentOpenTabs() {
    return this.getOpenTabs(this.state.tabs);
  }

  getOpenTabs(tabs) {
    return _.filter(tabs, tab => !this.isClosed(tab.key));
  }

  moveTabPosition(key1, key2) {
    const t1 = this.getIndexOfTabByKey(key1);
    const t2 = this.getIndexOfTabByKey(key2);
    return Utils.slideArray(this.state.tabs, t1, t2);
  }

  saveStartPositions() {
    // Do not save in state
    this.startPositions = _.map(this.state.tabs, (tab) => {
      const el = ReactDom.findDOMNode(this.refs[tab.key]);
      const pos = el ? el.getBoundingClientRect() : {};
      return {
        key: tab.key,
        pos,
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  cancelEventSafety(e) {
    const ev = e;
    if (typeof e.preventDefault !== 'function') {
      ev.preventDefault = () => {
      };
    }
    if (typeof e.stopPropagation !== 'function') {
      ev.stopPropagation = () => {
      };
    }
    ev.preventDefault();
    ev.stopPropagation();
    return ev;
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillMount() {
  }

  componentDidMount() {
    this.saveStartPositions();
    this.bindShortcuts();
  }

  componentWillUnmount() {
    this.constructor.unbindShortcuts();
  }

  componentWillReceiveProps(nextProps) {
    const newState = tabStateFromProps(nextProps);
    if (nextProps.selectedTab !== 'undefined') {
      newState.selectedTab = nextProps.selectedTab;
    }
    // reset closedTabs, respect props from application
    newState.closedTabs = [];
    this.setState(newState);
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillUpdate() {
  }

  componentDidUpdate() {
    this.saveStartPositions();
  }

  bindShortcuts() {
    if (this.props.shortCutKeys) {
      if (this.props.shortCutKeys.close) {
        Mousetrap.bind(this.props.shortCutKeys.close, (e) => {
          const ev = this.cancelEventSafety(e);
          if (this.state.selectedTab) {
            this.handleCloseButtonClick(this.state.selectedTab, ev);
          }
        });
      }
      if (this.props.shortCutKeys.create) {
        Mousetrap.bind(this.props.shortCutKeys.create, (e) => {
          const ev = this.cancelEventSafety(e);
          this.handleAddButtonClick(ev);
        });
      }
      if (this.props.shortCutKeys.moveRight) {
        Mousetrap.bind(this.props.shortCutKeys.moveRight, (e) => {
          const ev = this.cancelEventSafety(e);
          this.moveRight(ev);
        });
      }
      if (this.props.shortCutKeys.moveLeft) {
        Mousetrap.bind(this.props.shortCutKeys.moveLeft, (e) => {
          const ev = this.cancelEventSafety(e);
          this.moveLeft(ev);
        });
      }
    }
  }

  static unbindShortcuts() {
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
        const idx1 = this.getIndexOfTabByKey(key);
        const idx2 = this.getIndexOfTabByKey(pos.key);
        const minus = idx1 > idx2 ? 1 : -1;
        const movePx = (minus * (pos.pos.right - pos.pos.left)) - tempMoved;
        ReactDom.findDOMNode(this.refs[pos.key]).style.transform = `translate(${movePx}px, 0px)`;
        this.startPositions[idx2].moved = movePx;
      }
    });
  }

  handleDragStop(key, e) {
    const deltaX = (e.pageX || e.clientX);
    let swapedTabs = null;
    _.each(this.startPositions, (pos) => {
      const shoudBeSwap =
        key !== pos.key &&
        pos.pos.left < deltaX &&
        deltaX < pos.pos.right;
      if (shoudBeSwap) {
        swapedTabs = this.moveTabPosition(key, pos.key);
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
        this.props.onTabPositionChange(e, key, this.getOpenTabs(nextTabs));
      }
    });
  }

  handleTabClick(key, e) {
    const isBehindTab = key !== this.state.selectedTab;
    const idx = this.getIndexOfTabByKey(key);
    const isDragAfter = this.startPositions[idx].moved !== 0;
    if (isBehindTab && isDragAfter && this.props.keepSelectedTab) {
      e.preventDefault();
      return;
    }

    const classes = (e.target.getAttribute('class') || '').split(' ');
    if (classes.indexOf('rdTabCloseIcon') > -1) {
      this.cancelEventSafety(e);
    } else {
      this.setState({ selectedTab: key }, () => {
        this.props.onTabSelect(e, key, this.getCurrentOpenTabs());
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
      } else if (_.isFunction(onMouseLeave)) {
        onMouseLeave(e);
      }
    }
  }

  handleCloseButtonClick(key, e) {
    const ev = this.cancelEventSafety(e);
    const doClose = () => {
      let nextSelected;

      if (this.state.selectedTab === key) {
        nextSelected = this.getNextTabKey(key);
        if (!nextSelected) {
          nextSelected = this.getPrevTabKey(key);
        }
      } else {
        nextSelected = this.state.selectedTab;
      }

      const shoudBeNotifyTabChange = this.state.selectedTab !== nextSelected;
      this.setState({
        closedTabs: this.state.closedTabs.concat([key]),
        selectedTab: nextSelected,
      }, () => {
        const currentOpenTabs = this.getCurrentOpenTabs();
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
    this.props.onTabAddButtonClick(e, this.getCurrentOpenTabs());
  }

  moveRight(e) {
    let nextSelected = this.getNextTabKey(this.state.selectedTab);
    if (!nextSelected) {
      nextSelected = this.props.tabs[0] ? this.props.tabs[0].key : '';
    }
    if (nextSelected !== this.state.selectedTab) {
      this.setState({ selectedTab: nextSelected }, () => {
        this.props.onTabSelect(e, nextSelected, this.getCurrentOpenTabs());
      });
    }
  }

  moveLeft(e) {
    let nextSelected = this.getPrevTabKey(this.state.selectedTab);
    if (!nextSelected) {
      nextSelected = _.last(this.props.tabs) ? _.last(this.props.tabs).key : '';
    }
    if (nextSelected !== this.state.selectedTab) {
      this.setState({ selectedTab: nextSelected }, () => {
        this.props.onTabSelect(e, nextSelected, this.getCurrentOpenTabs());
      });
    }
  }

  getCloseButton(tab, style, classes, hoverStyleBase) {
    if (tab.props.unclosable) {
      return '';
    }
    const onHoverStyle = StyleOverride.merge(hoverStyleBase, tab.props.tabStyles.tabCloseIconOnHover);
    return (<CloseIcon
      style={style}
      hoverStyle={onHoverStyle}
      className={classes}
      onClick={this.handleCloseButtonClick.bind(this, tab.key)}>&times;</CloseIcon>);
  }

  render() {
    // override inline tabs styles
    const tabInlineStyles = {};
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
    const xtabClassNames = {};
    xtabClassNames.tabWrapper = classNames('rdTabWrapper', this.props.tabsClassNames.tabWrapper);
    xtabClassNames.tabBar = classNames('rdTabBar', this.props.tabsClassNames.tabBar);
    xtabClassNames.tabBarAfter = classNames('rdTabBarAfter', this.props.tabsClassNames.tabBarAfter);
    xtabClassNames.tab = classNames('rdTab', this.props.tabsClassNames.tab);
    xtabClassNames.tabBefore = classNames('rdTabBefore', this.props.tabsClassNames.tabBefore);
    xtabClassNames.tabAfter = classNames('rdTabAfter', this.props.tabsClassNames.tabAfter);
    xtabClassNames.tabTitle = classNames('rdTabTitle', this.props.tabsClassNames.tabTitle);
    xtabClassNames.tabBeforeTitle = classNames('rdTabBeforeTitle', this.props.tabsClassNames.tabBeforeTitle);
    xtabClassNames.tabAfterTitle = classNames('rdTabAfterTitle', this.props.tabsClassNames.tabAfterTitle);
    xtabClassNames.tabCloseIcon = classNames('rdTabCloseIcon', this.props.tabsClassNames.tabCloseIcon);


    const content = [];
    const tabs = _.map(this.state.tabs, (tab) => {
      if (this.state.closedTabs.indexOf(tab.key) > -1) {
        return '';
      }
      const {
        beforeTitle,
        title,
        afterTitle,
        tabClassNames,
        tabStyles,
        containerStyle,
        hiddenContainerStyle,
        onMouseEnter,
        onMouseLeave,
        unclosable,
        ...others
      } = tab.props;

      // override inline each tab styles
      let tabStyle = StyleOverride.merge(tabInlineStyles.tab, tabStyles.tab);
      let tabBeforeStyle = StyleOverride.merge(tabInlineStyles.tabBefore, tabStyles.tabBefore);
      let tabAfterStyle = StyleOverride.merge(tabInlineStyles.tabAfter, tabStyles.tabAfter);
      let tabTiteleStyle = StyleOverride.merge(tabInlineStyles.tabTitle, tabStyles.tabTitle);
      const tabCloseIconStyle = StyleOverride.merge(tabInlineStyles.tabCloseIcon, tabStyles.tabCloseIcon);

      let tabClasses = classNames(xtabClassNames.tab, tabClassNames.tab);
      const tabBeforeClasses = classNames(xtabClassNames.tabBefore, tabClassNames.tabBefore);
      const tabAfterClasses = classNames(xtabClassNames.tabAfter, tabClassNames.tabAfter);
      const tabTitleClasses = classNames(xtabClassNames.tabTitle, tabClassNames.tabTitle);
      const tabBeforeTitleClasses = classNames(xtabClassNames.tabBeforeTitle, tabClassNames.tabBeforeTitle);
      const tabAfterTitleClasses = classNames(xtabClassNames.tabAfterTitle, tabClassNames.tabAfterTitle);
      const tabCloseIconClasses = classNames(xtabClassNames.tabCloseIcon, tabClassNames.tabCloseIcon);

      if (this.state.selectedTab === tab.key) {
        tabStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tab, tabInlineStyles.tabActive), tabStyles.tabActive);
        tabBeforeStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabBefore, tabInlineStyles.tabBeforeActive), tabStyles.tabBeforeActive);
        tabAfterStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabAfter, tabInlineStyles.tabAfterActive), tabStyles.tabAfterActive);
        tabTiteleStyle = StyleOverride.merge(StyleOverride.merge(tabInlineStyles.tabTitle, tabInlineStyles.tabTitleActive), tabStyles.tabTitleActive);
        tabClasses = classNames(tabClasses, 'rdTabActive', this.props.tabsClassNames.tabActive, tabClassNames.tabActive);
        content.push(<TabContainer key={`tabContainer#${tab.key}`} selected={true}
                                   style={containerStyle}>{tab}</TabContainer>);
      } else {
        if (this.state.hoveredTab === tab.key) {
          tabStyle = StyleOverride.merge(StyleOverride.merge(tabStyle, tabInlineStyles.tabOnHover), tabStyles.tabOnHover);
          tabBeforeStyle = StyleOverride.merge(StyleOverride.merge(tabBeforeStyle, tabInlineStyles.tabBeforeOnHover), tabStyles.tabBeforeOnHover);
          tabAfterStyle = StyleOverride.merge(StyleOverride.merge(tabAfterStyle, tabInlineStyles.tabAfterOnHover), tabStyles.tabAfterOnHover);
          tabTiteleStyle = StyleOverride.merge(StyleOverride.merge(tabTiteleStyle, tabInlineStyles.tabTitleOnHover), tabStyles.tabTitleOnHover);
          tabClasses = classNames(tabClasses, 'rdTabHover', this.props.tabsClassNames.tabHover, tabClassNames.tabHover);
        }
        content.push(<TabContainer
          key={`tabContainer#${tab.key}`}
          selected={false}
          style={containerStyle}
          hiddenStyle={hiddenContainerStyle}>{tab}</TabContainer>);
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
      const closeButton = this.getCloseButton(tab, tabCloseIconStyle, tabCloseIconClasses, tabInlineStyles.tabCloseIconOnHover);

      return (
        <CustomDraggable
          key={tab.key}
          disabled={this.props.disableDrag}
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
            <span style={tabBeforeStyle} className={tabBeforeClasses}/>
            <span style={tabAfterStyle} className={tabAfterClasses}/>
          </li>
        </CustomDraggable>
      );
    });

    return (
      <div style={tabInlineStyles.tabWrapper} className={xtabClassNames.tabWrapper}>
        <ul tabIndex="-1" style={tabInlineStyles.tabBar} className={xtabClassNames.tabBar}>
          {tabs}
          <li className="rdTabAddButton" style={TabStyles.tabAddButton} onClick={this.handleAddButtonClick.bind(this)}>
            {this.props.tabAddButton}
          </li>
        </ul>
        <span style={tabInlineStyles.tabBarAfter} className={xtabClassNames.tabBarAfter}/>
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
  onTabSelect: () => {
  },
  onTabClose: () => {
  },
  onTabAddButtonClick: () => {
  },
  onTabPositionChange: () => {
  },
  shouldTabClose: () => true,
  keepSelectedTab: false,
  disableDrag: false,
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.element),

  selectedTab: PropTypes.string,
  tabsClassNames: PropTypes.shape({
    tabWrapper: PropTypes.string,
    tabBar: PropTypes.string,
    tabBarAfter: PropTypes.string,
    tab: PropTypes.string,
    tabBefore: PropTypes.string,
    tabAfter: PropTypes.string,
    tabBeforeTitle: PropTypes.string,
    tabTitle: PropTypes.string,
    tabAfterTitle: PropTypes.string,
    tabCloseIcon: PropTypes.string,
    tabActive: PropTypes.string,
    tabHover: PropTypes.string,
  }),
  tabsStyles: PropTypes.shape({
    tabWrapper: PropTypes.object,
    tabBar: PropTypes.object,
    tabBarAfter: PropTypes.object,
    tab: PropTypes.object,
    tabBefore: PropTypes.object,
    tabAfter: PropTypes.object,
    tabTitle: PropTypes.object,
    tabActive: PropTypes.object,
    tabTitleActive: PropTypes.object,
    tabBeforeActive: PropTypes.object,
    tabAfterActive: PropTypes.object,
    tabOnHover: PropTypes.object,
    tabTitleOnHover: PropTypes.object,
    tabBeforeOnHover: PropTypes.object,
    tabAfterOnHover: PropTypes.object,
    tabCloseIcon: PropTypes.object,
    tabCloseIconOnHover: PropTypes.object,
  }),
  shortCutKeys: PropTypes.shape({
    close: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    create: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    moveRight: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    moveLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }),
  tabAddButton: PropTypes.element,
  onTabSelect: PropTypes.func,
  onTabClose: PropTypes.func,
  onTabAddButtonClick: PropTypes.func,
  onTabPositionChange: PropTypes.func,
  shouldTabClose: PropTypes.func,
  keepSelectedTab: PropTypes.bool,
  disableDrag: PropTypes.bool,
};

export default Tabs;
