'use strict';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Dialog, FlatButton, Menu, MenuItem, TextField} from 'material-ui';
import {Tabs, Tab} from '../lib/index.js';

import DynamicTabContent from './DynamicTabContent';
import DynamicTabBadge from './DynamicTabBadge';

//allow react dev tools work
window.React = React;

const tabsClassNames = {
  tabWrapper: 'myWrapper',
  tabBar: 'myTabBar',
  tabBarAfter: 'myTabBarAfter',
  tab:      'myTab',
  tabTitle: 'myTabTitle',
  tabCloseIcon: 'tabCloseIcon',
  tabBefore: 'myTabBefore',
  tabAfter: 'myTabAfter'
};

const tabsStyles = {
  tabWrapper: {marginTop: '10px'},
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

    let icon = (<img src='icon.png' style={{height:'13px'}}/>);
    let fonticon = (<span className='icon-html5'/>);
    let badge = (<DynamicTabBadge />);

    this.state = {
      tabs:[
        (<Tab key={'tab0'} title={'unclosable tab'} unclosable={true} {...this.makeListeners('tab0')}>
          <div>
            <h1>This tab cannot close</h1>
          </div>
        </Tab>),
        (<Tab key={'tab1'} title={'1stTab'} beforeTitle={icon} {...this.makeListeners('tab1')}>
          <div>
            <h1>This is tab1</h1>
          </div>
        </Tab>),
        (<Tab key={'tab2'} title={'2ndTab Too long Toooooooooooooooooo long'} beforeTitle={fonticon} {...this.makeListeners('tab2')}>
          <div>
            <pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            </pre>
          </div>
        </Tab>),
        (<Tab key={'tab3'} title={'Dynamic tab'} afterTitle={badge} {...this.makeListeners('tab3')}>
          <DynamicTabContent/>
        </Tab>),
        (<Tab key={'tab4'} title={'Custom container'} containerStyle={{backgroundColor: 'gray', width: '50%'}} {...this.makeListeners('tab4')}>
          <div>
            <h1>This is tab4 with custom container style</h1>
          </div>
        </Tab>),
        (<Tab key={'tab5'} title={'Big content1 with left:-9999999px'} hiddenContainerStyle={{left: '-9999999px', top: '-9999999px'}} {...this.makeListeners('tab5')}>
          <div>
            <h1>Super big content</h1>
              {Array(10000).fill(0).map((_, i) => <p key={i}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>)}
          </div>
        </Tab>),
        (<Tab key={'tab6'} title={'after big content'} {...this.makeListeners('tab6')}>
          <div>
            <pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            </pre>
          </div>
        </Tab>),
      ],
      badgeCount: 0,
      menuPosition: {},
      showMenu: false,
      dialogOpen: false
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme()};
  }

  // getChildContext() {
  //   return {
  //     muiTheme: ThemeManager.getMuiTheme()
  //   };
  // }

  makeListeners(key){
    return {
      onClick: (e) => { console.log('onClick', key, e);}, // never called
      onContextMenu: (e) => { console.log('onContextMenu', key, e); this.handleTabContextMenu(key, e)},
      onDoubleClick: (e) => { console.log('onDoubleClick', key, e); this.handleTabDoubleClick(key, e)},
    }
  }

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
    let newTab = (<Tab key={key} title='untitled' {...this.makeListeners(key)}>
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

  handleTabDoubleClick(key) {
    this.setState({
      editTabKey: key,
      dialogOpen: true
    });
  }

  handleTabContextMenu(key, e) {
    e.preventDefault();
    this.setState({
      showMenu: true,
      contextTarget: key,
      menuPosition: {
        top:`${e.pageY}px`,
        left:`${e.pageX}px`
      }
    });
  }

  cancelContextMenu(){
    this.setState({
      showMenu: false,
      contextTarget: null
    });
  }

  renameFromContextMenu(){
    this.setState({
      showMenu: false,
      contextTarget: null,
      editTabKey: this.state.contextTarget,
      dialogOpen: true
    });
  }

  closeFromContextMenu(){
    let newTabs = _.filter(this.state.tabs, (t) => {return t.key !== this.state.contextTarget;});
    this.setState({
      showMenu: false,
      contextTarget: null,
      selectedTab: 'tab0',
      tabs: newTabs
    });
  }

  _onDialogSubmit() {
    const replaceFunc = _.bind((tab) => {
        if (tab.key === this.state.editTabKey) {
          return React.cloneElement(tab, {title: this.refs.input.getValue()});
        }
        return tab;
      }, this),
      newTabs = _.map(this.state.tabs, replaceFunc);
    this.setState({
      tabs: newTabs,
      dialogOpen: false
    });
  }

  _onDialogCancel() {
    this.setState({
      dialogOpen: false
    })
  }

  _onDialogShow() {
    let tab = _.find(this.state.tabs, (t) => {
      return t.key === this.state.editTabKey;
    });
    this.refs.input.setValue(tab.props.title);
  }

  shouldTabClose(e, key){
    console.log('should tab close', e, key);
    return window.confirm('close?');
  }

  render() {

    let standardActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this._onDialogCancel.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this._onDialogSubmit.bind(this)}
      />
    ];

    let menuStyle = {
      display: this.state.showMenu ? 'block': 'none',
      position: 'absolute',
      top: this.state.menuPosition.top,
      left: this.state.menuPosition.left,
      backgroundColor: '#F0F0F0'
    };

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
          shouldTabClose={this.shouldTabClose.bind(this)}
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
        <div style={menuStyle}>
          <Menu>
            {this.state.contextTarget === 'tab0' ? '' : <MenuItem primaryText="Close" onClick={this.closeFromContextMenu.bind(this)}/>}
            <MenuItem primaryText="Rename" onClick={this.renameFromContextMenu.bind(this)}/>
            <MenuItem primaryText="Cancel" onClick={this.cancelContextMenu.bind(this)}/>
          </Menu>
        </div>
        <Dialog
          title="Change tab name"
          ref="dialog"
          actions={standardActions}
          modal={true}
          open={this.state.dialogOpen}
          onShow={this._onDialogShow.bind(this)}>
          <TextField
            ref='input' id="rename-input" style={{width: '90%'}}/>
        </Dialog>
        <p style={{position: 'fixed', 'bottom': '10px'}}>
          Source code can be found at <a href='https://github.com/georgeOsdDev/react-draggable-tab/tree/master/example'>GitHub</a>
        </p>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object
};

ReactDOM.render(<App/>, document.getElementById('tabs'));
