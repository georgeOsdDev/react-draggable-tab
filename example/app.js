'use strict';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {Dialog, TextField, Styles} from 'material-ui';
let ThemeManager = Styles.ThemeManager;
import {Tabs, Tab} from '../lib/index.js';

import DynamicTabContent from './DynamicTabContent';
import DynamicTabBadge from './DynamicTabBadge';

//allow react dev tools work
window.React = React;

const tabsClassNames = {
  tabBar: 'myTabBar',
  tabBarAfter: 'myTabBarAfter',
  tab:      'myTab',
  tabTitle: 'myTabTitle',
  tabCloseIcon: 'tabCloseIcon',
  tabBefore: 'myTabBefore',
  tabAfter: 'myTabAfter'
};

const tabsStyles = {
  tabBar: {},
  tab:{},
  tabTitle: {},
  tabCloseIcon: {},
  tabBefore: {},
  tabAfter: {}
};

class App extends React.Component {
  constructor(props) {
    super(props);

    let icon = (<image src='icon.png' style={{height:'13px'}}/>);
    let fonticon = (<icon className='icon-html5'/>);
    let badge = (<DynamicTabBadge />);

    this.state = {
      tabs:[
        (<Tab key={'tab0'} title={'unclosable tab'} disableClose={true} >
          <div>
            <h1>This tab cannot close</h1>
          </div>
        </Tab>),
        (<Tab key={'tab1'} title={'1stTab'} beforeTitle={icon} >
          <div>
            <h1>This is tab1</h1>
          </div>
        </Tab>),
        (<Tab key={'tab2'} title={'2ndTab Too long Toooooooooooooooooo long'} beforeTitle={fonticon} >
          <div>
            <pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            </pre>
          </div>
        </Tab>),
        (<Tab key={'tab3'} title={'Dynamic tab'} afterTitle={badge}>
          <DynamicTabContent/>
        </Tab>)
      ],
      badgeCount: 0
    };
  }

  // getChildContext() {
  //   return {
  //     muiTheme: ThemeManager.getMuiTheme()
  //   };
  // }


  handleTabSelect(e, key, currentTabs) {
    console.log('handleTabSelect key:', key);
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
    let newTab = (<Tab key={key} title='untitled' >
                    <div>
                      <h1>New Empty Tab</h1>
                    </div>
                  </Tab>);
    let newTabs = currentTabs.concat([newTab]);

    this.setState({
      tabs: newTabs,
      selectedTab: key
    });
  }

  handleTabDoubleClick(e, key) {

    let tab = _.find(this.state.tabs, (t) => {
      return t.key === key;
    });
    this.setState({
      editTabKey: key
    }, () => {
      this.refs.dialog.show();
    });
  }

  handleTabMouseEnter(e, key) {
    console.log('tab mouseEnter key:', key);
  }

  handleTabMouseLeave(e, key) {
    console.log('tab mouseLeave key:', key);
  }

  _onDialogSubmit() {
    let title = this.refs.input.getValue();
    let newTabs = _.map(this.state.tabs, (tab) => {
      if(tab.key === this.state.editTabKey) {
        return React.cloneElement(tab, {title: title});
      } else {
        return tab;
      }
    });
    this.setState({tabs: newTabs}, () => {
      this.refs.dialog.dismiss();
    });
  }

  _onDialogCancel() {
    this.refs.dialog.dismiss();
  }

  _onDialogShow() {
    let tab = _.find(this.state.tabs, (t) => {
      return t.key === this.state.editTabKey;
    });
    this.refs.input.setValue(tab.props.title);
  }

  _handleBadgeInc() {
    this.setState({badgeCount: this.state.badgeCount + 1});
  }

  _handleBadgeDec() {
    this.setState({badgeCount: this.state.badgeCount + 1});
  }

  render() {

    let standardActions = [
      { text: 'Cancel', onClick: this._onDialogCancel.bind(this) },
      { text: 'Submit', onClick: this._onDialogSubmit.bind(this), ref: 'submit' }
    ];


    return (
      <div>
        <Tabs
          tabsClassNames={tabsClassNames}
          tabsStyles={tabsStyles}
          selectedTab={this.state.selectedTab ? this.state.selectedTab : 'tab2'}
          onTabSelect={this.handleTabSelect.bind(this)}
          onTabClose={this.handleTabClose.bind(this)}
          onTabAddButtonClick={this.handleTabAddButtonClick.bind(this)}
          onTabPositionChange={this.handleTabPositionChange.bind(this)}
          onTabDoubleClick={this.handleTabDoubleClick.bind(this)}
          onTabMouseEnter={this.handleTabMouseEnter.bind(this)}
          onTabMouseLeave={this.handleTabMouseLeave.bind(this)}
          tabs={this.state.tabs}
          shortCutKeys={
            {
              'close': ['alt+command+w', 'alt+ctrl+w'],
              'create': ['alt+command+t', 'alt+ctrl+t'],
              'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
              'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
            }
          }
          keepSelectedTab={true}
        />
        <Dialog
          title="Change tab name"
          ref="dialog"
          actions={standardActions}
          actionFocus="submit"
          modal={true}
          onShow={this._onDialogShow.bind(this)}>
          <TextField
            ref='input' style={{width: '90%'}}/>
        </Dialog>
        <p style={{position: 'fixed', 'bottom': '10px'}}>
          Source code can be found at <a href='https://github.com/georgeOsdDev/react-draggable-tab/tree/master/example'>GitHub</a>
        </p>
      </div>
    );
  }
}

App.childContextTypes = {
  // muiTheme: React.PropTypes.object
};

ReactDOM.render(<App/>, document.getElementById('tabs'));
