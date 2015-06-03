'use strict';

import _     from 'lodash';
import React from 'react/addons';
import Tabs  from '../components/Tabs';
import Tab   from '../components/Tab';

//allow react dev tools work
window.React = React;

const tabClassNames = {
  tabBar: 'myTabBar',
  tabBarAfter: 'myTabBarAfter',
  tab:      'myTab',
  tabTitle: 'myTabTitle',
  tabCloseIcon: 'tabCloseIcon',
  tabBefore: 'myTabBefore',
  tabAfter: 'myTabAfter'
}

const tabStyles = {
  tabBar: {},
  tab:{},
  tabTitle: {},
  tabCloseIcon: {},
  tabBefore: {},
  tabAfter: {}
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs:[
        (<Tab key={'tab0'} title={'fixedTab'} disableClose={true} >
          <div>
            <h1>This tab cannot close</h1>
          </div>
        </Tab>),
        (<Tab key={'tab1'} title={'1stTab'} >
          <div>
            <h1>This is tab1</h1>
          </div>
        </Tab>),
        (<Tab key={'tab2'} title={'2ndTab Too long Toooooooooooooooooo long'} >
          <div>
            <pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            </pre>
          </div>
        </Tab>),
        this._getDynamicTab()
      ],
      textvalue: ''
    };
  }

  _getDynamicTab() {
    return (
    <Tab key='tab3' title={'3rdTab'} >
      <div>
        <h1>TAB3!!! This tab dynamically change</h1>
        <textarea value={this.state ? this.state.textValue: ''} onChange={this._handleTextChange.bind(this)}></textarea>
      </div>
    </Tab>);
  }

  _handleTextChange(e) {
    this.setState({textValue: e.target.value});
  }

  _replaceDynamicTab(tabs) {
    return _.map(tabs, (tab) => {
      if(tab.key === 'tab3') {
        return this._getDynamicTab();
      } else {
        return tab;
      }
    });
  }

  handleTabSelect(e, key, currentTabs) {
    console.log('tabSelected key:', key);
    this.setState({selectedTab: key, tabs: currentTabs});
  }

  handleTabClose(e, key, currentTabs) {
    console.log('tabClosed key:', key);
    this.setState({tabs: currentTabs});
  }

  handleTabPositionChange(e, key, currentTabs) {
    console.log('tabPositionChanged key:', key);
    this.setState({tabs: currentTabs});
  }

  handleTabAddButtonClick(e, currentTabs) {
    // key must be unique
    const key = 'newTab_' + Date.now();
    let newTab = (<Tab key={key} title='untitle'>
                    <div>
                      <h1>New Empty Tab</h1>
                    </div>
                  </Tab>);
    let newTabs = currentTabs.concat([newTab]);

    this.setState({
      tabs: this._replaceDynamicTab(newTabs),
      selectedTab: key
    });
  }

  render() {

    let tabs = this._replaceDynamicTab(this.state.tabs)

    return (
      <Tabs
        tabClassNames={tabClassNames}
        tabStyles={tabStyles}
        selectedTab={this.state.selectedTab ? this.state.selectedTab : "tab2"}
        onTabSelected={this.handleTabSelect.bind(this)}
        onTabClosed={this.handleTabClose.bind(this)}
        onTabAddButtonClicked={this.handleTabAddButtonClick.bind(this)}
        onTabPositionChanged={this.handleTabPositionChange.bind(this)}
        tabs={tabs}>
      </Tabs>
    )
  }
};

React.render(<App/>, document.getElementById('tabs'));
