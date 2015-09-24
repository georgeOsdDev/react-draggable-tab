'use strict';
import React from 'react/addons';
import chai from 'chai';
import Mousetrap from 'mousetrap';
let expect = chai.expect;
import triggerEvent from '../triggerEvent.js';

import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
const {TestUtils} = React.addons;

describe('Test of Tabs', () => {
  let component;

  beforeEach(() => {
    // component = TestUtils.renderIntoDocument(<Tabs></Tabs>);
  });

  it('should have default properties', function () {
    component = TestUtils.renderIntoDocument(<Tabs/>);

    expect(component.props.tabsClassNames).to.be.an('object');
    expect(component.props.tabsClassNames.tabBar).to.be.equal('');
    expect(component.props.tabsClassNames.tabBarAfter).to.be.equal('');
    expect(component.props.tabsClassNames.tab).to.be.equal('');
    expect(component.props.tabsClassNames.tabBefore).to.be.equal('');
    expect(component.props.tabsClassNames.tabAfter).to.be.equal('');
    expect(component.props.tabsClassNames.tabBeforeTitle).to.be.equal('');
    expect(component.props.tabsClassNames.tabTitle).to.be.equal('');
    expect(component.props.tabsClassNames.tabAfterTitle).to.be.equal('');
    expect(component.props.tabsClassNames.tabCloseIcon).to.be.equal('');
    expect(component.props.tabsClassNames.tabActive).to.be.equal('');

    expect(component.props.tabsStyles).to.be.empty;

    expect(component.props.tabAddButton.type).to.be.equal('span');

    expect(component.props.shortCutKeys).to.be.empty;

    expect(typeof component.props.onTabSelect).to.be.equal('function');
    expect(typeof component.props.onTabClose).to.be.equal('function');
    expect(typeof component.props.onTabAddButtonClick).to.be.equal('function');
    expect(typeof component.props.onTabPositionChange).to.be.equal('function');
    expect(typeof component.props.onTabDoubleClick).to.be.equal('function');

  });


  describe('render tabs and selected tab content', function(){

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <h1>tab1Content</h1>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <h1>tab2Content</h1>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <h1>tab3Content</h1>
      </Tab>)
    ];

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render tab title as list', function(){
      let children = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(children).to.be.length(3);

      let t1 = TestUtils.findRenderedDOMComponentWithClass(children[0], 'rdTabTitle');
      expect(React.findDOMNode(t1).textContent).to.be.equal('tab1');

      let t2 = TestUtils.findRenderedDOMComponentWithClass(children[1], 'rdTabTitle');
      expect(React.findDOMNode(t2).textContent).to.be.equal('tab2');

      let t3 = TestUtils.findRenderedDOMComponentWithClass(children[2], 'rdTabTitle');
      expect(React.findDOMNode(t3).textContent).to.be.equal('tab3');
    });

    it('render first tab as selected', function(){
      let activeTab = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      let title = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabTitle');
      expect(React.findDOMNode(title).textContent).to.be.equal('tab1');
    });

    it('render first tab\'s content', function(){
      let content = TestUtils.scryRenderedDOMComponentsWithTag(component, 'h1');
      expect(content).to.be.length(3);
      expect(React.findDOMNode(content[0]).textContent).to.be.equal('tab1Content');
      expect(React.findDOMNode(content[0]).parentNode.style.height).to.be.not.equal('0px');
      expect(React.findDOMNode(content[1]).textContent).to.be.equal('tab2Content');
      expect(React.findDOMNode(content[1]).parentNode.style.height).to.be.equal('0px');
      expect(React.findDOMNode(content[2]).textContent).to.be.equal('tab3Content');
      expect(React.findDOMNode(content[2]).parentNode.style.height).to.be.equal('0px');
    });
  });

  describe('render tab title as element', function(){

    const tabs = [
      (<Tab key={'tab1'} title={<span>tab1</span>} >
        <h1>tab1Content</h1>
      </Tab>),
      (<Tab key={'tab2'} title={<strong>tab2</strong>} >
        <h1>tab2Content</h1>
      </Tab>),
      (<Tab key={'tab3'} title={<label>tab3</label>} >
        <h1>tab3Content</h1>
      </Tab>)
    ];

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render tab title as list', function(){
      let children = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(children).to.be.length(3);

      let t1 = TestUtils.findRenderedDOMComponentWithClass(children[0], 'rdTabTitle');
      let t1Element = TestUtils.findRenderedDOMComponentWithTag(t1, 'span');
      expect(React.findDOMNode(t1Element).textContent).to.be.equal('tab1');

      let t2 = TestUtils.findRenderedDOMComponentWithClass(children[1], 'rdTabTitle');
      let t2Element = TestUtils.findRenderedDOMComponentWithTag(t2, 'strong');
      expect(React.findDOMNode(t2Element).textContent).to.be.equal('tab2');

      let t3 = TestUtils.findRenderedDOMComponentWithClass(children[2], 'rdTabTitle');
      let t3Element = TestUtils.findRenderedDOMComponentWithTag(t3, 'label');
      expect(React.findDOMNode(t3Element).textContent).to.be.equal('tab3');
    });

  });

  describe('add optional element before/after Title', () => {

    const el1 = (<i className='icon icon1' />);
    const el2 = (<i className='icon icon2' />);
    const el3 = (<i className='icon icon3' />);
    const el4 = (<i className='icon icon4' />);

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} beforeTitle={el1}>
        <h1>tab1Content</h1>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} afterTitle={el2}>
        <h1>tab2Content</h1>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} beforeTitle={el3} afterTitle={el4}>
        <h1>tab3Content</h1>
      </Tab>)
    ];
    let children;

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          selectedTab="tab1"
          tabs={tabs} />);
      children = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
    });

    it('will insert custome element before title', () => {
      let t1BeforeTitle = TestUtils.findRenderedDOMComponentWithClass(children[0], 'rdTabBeforeTitle');
      let t1BeforeTitleIcon = TestUtils.scryRenderedDOMComponentsWithTag(t1BeforeTitle, 'i');
      expect(t1BeforeTitleIcon).to.be.length(1);
      expect(React.findDOMNode(t1BeforeTitleIcon[0]).className.indexOf('icon1') > 0).to.be.equal(true);

      let t1AfterTitle = TestUtils.findRenderedDOMComponentWithClass(children[0], 'rdTabAfterTitle');
      let t1AfterTitleIcon = TestUtils.scryRenderedDOMComponentsWithTag(t1AfterTitle, 'i');
      expect(t1AfterTitleIcon).to.be.length(0);
    });

    it('will insert custome element affter title', () => {
      let t2BeforeTitle = TestUtils.findRenderedDOMComponentWithClass(children[1], 'rdTabBeforeTitle');
      let t2BeforeTitleIcon = TestUtils.scryRenderedDOMComponentsWithTag(t2BeforeTitle, 'i');
      expect(t2BeforeTitleIcon).to.be.length(0);

      let t2AfterTitle = TestUtils.findRenderedDOMComponentWithClass(children[1], 'rdTabAfterTitle');
      let t2AfterTitleIcon = TestUtils.scryRenderedDOMComponentsWithTag(t2AfterTitle, 'i');
      expect(t2AfterTitleIcon).to.be.length(1);
      expect(React.findDOMNode(t2AfterTitleIcon[0]).className.indexOf('icon2') > 0).to.be.equal(true);
    });

    it('will insert custome element before/affter title', () => {
      let t3BeforeTitle = TestUtils.findRenderedDOMComponentWithClass(children[2], 'rdTabBeforeTitle');
      let t3BeforeTitleIcon = TestUtils.scryRenderedDOMComponentsWithTag(t3BeforeTitle, 'i');
      expect(t3BeforeTitleIcon).to.be.length(1);
      expect(React.findDOMNode(t3BeforeTitleIcon[0]).className.indexOf('icon3') > 0).to.be.equal(true);

      let t3AfterTitle = TestUtils.findRenderedDOMComponentWithClass(children[2], 'rdTabAfterTitle');
      let t3AfterTitleIcon = TestUtils.scryRenderedDOMComponentsWithTag(t3AfterTitle, 'i');
      expect(t3AfterTitleIcon).to.be.length(1);
      expect(React.findDOMNode(t3AfterTitleIcon[0]).className.indexOf('icon4') > 0).to.be.equal(true);
    });
  });

  describe('add custom className to all tabs ', function(){

    const tabsClassNames = {
      tabBar: 'myTabBar',
      tabBarAfter: 'myTabBarAfter',
      tab:      'myTab',
      tabTitle: 'myTabTitle',
      tabBeforeTitle: 'myTabBeforeTitle',
      tabAfterTitle: 'myTabAfterTitle',
      tabCloseIcon: 'myTabCloseIcon',
      tabBefore: 'myTabBefore',
      tabAfter: 'myTabAfter',
      tabActive: 'myTabActive'
    };


    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>)
    ];

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={tabsClassNames}
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render elements with custome class', function(){
      let rdTabBar = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(React.findDOMNode(rdTabBar).className).contain('myTabBar');

      let rdTabBarAfter = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(React.findDOMNode(rdTabBarAfter).className).contain('myTabBarAfter');

      let rdTab = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTab');
      expect(React.findDOMNode(rdTab).className).contain('myTab');

      let rdTabBefore = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBefore');
      expect(React.findDOMNode(rdTabBefore).className).contain('myTabBefore');

      let rdTabAfter = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAfter');
      expect(React.findDOMNode(rdTabAfter).className).contain('myTabAfter');

      let rdTabTitle = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabTitle');
      expect(React.findDOMNode(rdTabTitle).className).contain('myTabTitle');

      let rdTabBeforeTitle = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBeforeTitle');
      expect(React.findDOMNode(rdTabBeforeTitle).className).contain('myTabBeforeTitle');

      let rdTabAfterTitle = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAfterTitle');
      expect(React.findDOMNode(rdTabAfterTitle).className).contain('myTabAfterTitle');

      let rdTabActive = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      expect(React.findDOMNode(rdTabActive).className).contain('myTabActive');

      let rdTabCloseIconb = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabCloseIcon');
      expect(React.findDOMNode(rdTabCloseIconb).className).contain('myTabCloseIcon');

    });

  });


  describe('overwite inline style to all tabs', function(){

    const tabsStyles = {
      tabBar: {fontSize: '101px'},
      tabBarAfter: {fontSize: '102px'},
      tab: {fontSize: '103px'},
      tabBefore: {fontSize: '104px'},
      tabAfter: {fontSize: '105px'},
      tabTitle: {fontSize: '106px'},
      tabActive: {fontSize: '107px'},
      tabTitleActive: {fontSize: '108px'},
      tabBeforeActive: {fontSize: '109px'},
      tabAfterActive: {fontSize: '110px'},
      tabCloseIcon: {fontSize: '111px'}
    };

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>)
    ];

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsStyles={tabsStyles}
          selectedTab="tab2"
          tabs={tabs} />);
    });

    it('render elements with custome inline-style', function(){
      let rdTabBar = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(React.findDOMNode(rdTabBar).style.fontSize).to.be.eql('101px');

      let rdTabBarAfter = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(React.findDOMNode(rdTabBarAfter).style.fontSize).to.be.eql('102px');

      let rdTab = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(React.findDOMNode(rdTab[0]).style.fontSize).to.be.eql('103px');

      let rdTabBefore = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(React.findDOMNode(rdTabBefore[0]).style.fontSize).to.be.eql('104px');

      let rdTabAfter = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(React.findDOMNode(rdTabAfter[0]).style.fontSize).to.be.eql('105px');

      let rdTabTitle = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(React.findDOMNode(rdTabTitle[0]).style.fontSize).to.be.eql('106px');

      let activeTab = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');

      let rdTabActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTab');
      expect(React.findDOMNode(rdTabActive).style.fontSize).to.be.eql('107px');

      let rdTabTitleActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabTitle');
      expect(React.findDOMNode(rdTabTitleActive).style.fontSize).to.be.eql('108px');

      let rdTabBeforeActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabBefore');
      expect(React.findDOMNode(rdTabBeforeActive).style.fontSize).to.be.eql('109px');

      let rdTabAfterActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabAfter');
      expect(React.findDOMNode(rdTabAfterActive).style.fontSize).to.be.eql('110px');

      let rdTabCloseIcon = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabCloseIcon');
      expect(React.findDOMNode(rdTabCloseIcon).style.fontSize).to.be.eql('111px');

    });

  });

  describe('add custom className to specifyed tab ', function(){

    const tabsClassNames = {
      tabBar: 'myTabBar',
      tabBarAfter: 'myTabBarAfter',
      tab:      'myTab',
      tabTitle: 'myTabTitle',
      tabBeforeTitle: 'myTabBeforeTitle',
      tabAfterTitle: 'myTabAfterTitle',
      tabCloseIcon: 'myTabCloseIcon',
      tabBefore: 'myTabBefore',
      tabAfter: 'myTabAfter',
      tabActive: 'myTabActive'
    };

    const tabClassNames = {
      tab:      'mySpecialTab',
      tabTitle: 'mySpecialTabTitle',
      tabBeforeTitle: 'mySpecialTabBeforeTitle',
      tabAfterTitle: 'mySpecialTabAfterTitle',
      tabCloseIcon: 'mySpecialTabCloseIcon',
      tabBefore: 'mySpecialTabBefore',
      tabAfter: 'mySpecialTabAfter',
      tabActive: 'mySpecialTabActive'
    };

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} tabClassNames={tabClassNames} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>)
    ];

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={tabsClassNames}
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render elements with custome class', function(){
      let rdTabBar = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(React.findDOMNode(rdTabBar).className).contain('myTabBar');

      let rdTabBarAfter = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(React.findDOMNode(rdTabBarAfter).className).contain('myTabBarAfter');

      let rdTab = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(React.findDOMNode(rdTab[0]).className).contain('mySpecialTab');
      expect(React.findDOMNode(rdTab[1]).className).not.contain('mySpecialTab');

      let rdTabBefore = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(React.findDOMNode(rdTabBefore[0]).className).contain('mySpecialTabBefore');
      expect(React.findDOMNode(rdTabBefore[1]).className).not.contain('mySpecialTabBefore');

      let rdTabAfter = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(React.findDOMNode(rdTabAfter[0]).className).contain('mySpecialTabAfter');
      expect(React.findDOMNode(rdTabAfter[1]).className).not.contain('mySpecialTabAfter');

      let rdTabTitle = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(React.findDOMNode(rdTabTitle[0]).className).contain('mySpecialTabTitle');
      expect(React.findDOMNode(rdTabTitle[1]).className).not.contain('mySpecialTabTitle');

      let rdTabBeforeTitle = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBeforeTitle');
      expect(React.findDOMNode(rdTabBeforeTitle[0]).className).contain('mySpecialTabBeforeTitle');
      expect(React.findDOMNode(rdTabBeforeTitle[1]).className).not.contain('mySpecialTabBeforeTitle');

      let rdTabAfterTitle = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfterTitle');
      expect(React.findDOMNode(rdTabAfterTitle[0]).className).contain('mySpecialTabAfterTitle');
      expect(React.findDOMNode(rdTabAfterTitle[1]).className).not.contain('mySpecialTabAfterTitle');

      let rdTabActive = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      expect(React.findDOMNode(rdTabActive).className).contain('mySpecialTabActive');

      let rdTabCloseIcon = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabCloseIcon');
      expect(React.findDOMNode(rdTabCloseIcon[0]).className).contain('mySpecialTabCloseIcon');
      expect(React.findDOMNode(rdTabCloseIcon[1]).className).not.contain('mySpecialTabCloseIcon');

    });

  });


  describe('overwite inline style to specifyed tab', function(){

    const tabsStyles = {
      tabBar: {fontSize: '101px'},
      tabBarAfter: {fontSize: '102px'},
      tab: {fontSize: '103px'},
      tabBefore: {fontSize: '104px'},
      tabAfter: {fontSize: '105px'},
      tabTitle: {fontSize: '106px'},
      tabActive: {fontSize: '107px'},
      tabTitleActive: {fontSize: '108px'},
      tabBeforeActive: {fontSize: '109px'},
      tabAfterActive: {fontSize: '110px'},
      tabCloseIcon: {fontSize: '111px'}
    };

    const tabStyles2 = {
      tab: {fontSize: '201px'},
      tabBefore: {fontSize: '202px'},
      tabAfter: {fontSize: '203px'},
      tabTitle: {fontSize: '204px'},
      tabActive: {fontSize: '205px'},
      tabTitleActive: {fontSize: '206px'},
      tabBeforeActive: {fontSize: '207px'},
      tabAfterActive: {fontSize: '208px'},
      tabCloseIcon: {fontSize: '209px'}
    };

    const tabStyles3 = {
      tab: {fontSize: '301px'},
      tabBefore: {fontSize: '302px'},
      tabAfter: {fontSize: '303px'},
      tabTitle: {fontSize: '304px'},
      tabCloseIcon: {fontSize: '305px'}
    };

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} tabStyles={tabStyles2}>
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} tabStyles={tabStyles3}>
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>)

    ];

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsStyles={tabsStyles}
          selectedTab="tab2"
          tabs={tabs} />);
    });

    it('render elements with custome inline-style', function(){
      let rdTabBar = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(React.findDOMNode(rdTabBar).style.fontSize).to.be.eql('101px');

      let rdTabBarAfter = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(React.findDOMNode(rdTabBarAfter).style.fontSize).to.be.eql('102px');

      let rdTab = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(React.findDOMNode(rdTab[0]).style.fontSize).to.be.eql('103px');
      expect(React.findDOMNode(rdTab[2]).style.fontSize).to.be.eql('301px');

      let rdTabBefore = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(React.findDOMNode(rdTabBefore[0]).style.fontSize).to.be.eql('104px');
      expect(React.findDOMNode(rdTabBefore[2]).style.fontSize).to.be.eql('302px');

      let rdTabAfter = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(React.findDOMNode(rdTabAfter[0]).style.fontSize).to.be.eql('105px');
      expect(React.findDOMNode(rdTabAfter[2]).style.fontSize).to.be.eql('303px');

      let rdTabTitle = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(React.findDOMNode(rdTabTitle[0]).style.fontSize).to.be.eql('106px');
      expect(React.findDOMNode(rdTabTitle[2]).style.fontSize).to.be.eql('304px');

      let activeTab = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');

      let rdTabActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTab');
      expect(React.findDOMNode(rdTabActive).style.fontSize).to.be.eql('205px');

      let rdTabTitleActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabTitle');
      expect(React.findDOMNode(rdTabTitleActive).style.fontSize).to.be.eql('206px');

      let rdTabBeforeActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabBefore');
      expect(React.findDOMNode(rdTabBeforeActive).style.fontSize).to.be.eql('207px');

      let rdTabAfterActive = TestUtils.findRenderedDOMComponentWithClass(activeTab, 'rdTabAfter');
      expect(React.findDOMNode(rdTabAfterActive).style.fontSize).to.be.eql('208px');

      let rdTabCloseIcon = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabCloseIcon');
      expect(React.findDOMNode(rdTabCloseIcon[0]).style.fontSize).to.be.eql('111px');
      expect(React.findDOMNode(rdTabCloseIcon[1]).style.fontSize).to.be.eql('209px');
      expect(React.findDOMNode(rdTabCloseIcon[2]).style.fontSize).to.be.eql('305px');
    });

  });

  describe('when TabAddButton clicked', function () {
    let called = false;
    let currentTabs = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabAddButtonClick={function(e, _currentTabs){called = true; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      const button = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAddButton');
      TestUtils.Simulate.click(React.findDOMNode(button));
    });

    it('should call onTabAddButtonClick prop', () => {
      expect(called).to.be.equal(true);
    });
    it('should pass currentTabs to onTabAddButtonClick', () => {
      expect(currentTabs).to.be.length(2);
      expect(currentTabs[0].key).to.be.equal('tab1');
    });

  });


  describe('when Tab clicked', function () {
    let called = false;
    let key = '';
    let currentTabs = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabSelect={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      let rdTabTitles = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      TestUtils.Simulate.click(React.findDOMNode(rdTabTitles[2]));
    });

    it('should call onTabSelect prop', () => {
      expect(called).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabSelect', () => {
      expect(key).to.be.eql('tab3');

      expect(currentTabs).to.be.length(3);
      expect(currentTabs[0].key).to.be.equal('tab1');
    });
  });

  describe('when Tab clicked', function () {
    let called = false;
    let key = '';
    let currentTabs = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabSelect={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      let rdTabTitles = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      TestUtils.Simulate.click(React.findDOMNode(rdTabTitles[2]));
    });

    it('should call onTabSelect prop', () => {
      expect(called).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabSelect', () => {
      expect(key).to.be.eql('tab3');

      expect(currentTabs).to.be.length(3);
      expect(currentTabs[0].key).to.be.equal('tab1');
    });
  });

  describe('when Tab double clicked', function () {
    let called = false;
    let key = '';

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabDoubleClick={function(e, _key){called = true; key = _key; }}
          selectedTab="tab1"
          tabs={tabs} />);

      let rdTabTitles = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      TestUtils.Simulate.doubleClick(React.findDOMNode(rdTabTitles[2]));
    });

    it('should call onTabDoubleClick prop', () => {
      expect(called).to.be.equal(true);
    });
    it('should pass key', () => {
      expect(key).to.be.eql('tab3');
    });
  });

  describe('when unselected Tab closed', function () {
    let called1 = false;
    let called2 = false;
    let key1 = '';
    let key2 = '';
    let currentTabs1 = [];
    let currentTabs2 = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs} />);

      let rdTabs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      const tab2CloseButton = TestUtils.findRenderedDOMComponentWithClass(rdTabs[1], 'myCloseButton');
      TestUtils.Simulate.click(React.findDOMNode(tab2CloseButton));
    });

    it('should call onTabClose prop', () => {
      expect(called1).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabClose', () => {
      expect(key1).to.be.eql('tab2');

      expect(currentTabs1).to.be.length(2);
      expect(currentTabs1[0].key).to.be.equal('tab1');
    });
    it('should selected tab will not change', () => {
      expect(called2).to.be.equal(false);
      expect(key2).to.be.eql('');

      expect(currentTabs2).to.be.length(0);
    });
  });

  describe('when selected Tab closed', function () {
    let called1 = false;
    let called2 = false;
    let key1 = '';
    let key2 = '';
    let currentTabs1 = [];
    let currentTabs2 = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab2"
          tabs={tabs} />);

        let rdTabs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
        const tab2CloseButton = TestUtils.findRenderedDOMComponentWithClass(rdTabs[1], 'myCloseButton');
        TestUtils.Simulate.click(React.findDOMNode(tab2CloseButton));
    });

    it('should call onTabClose prop', () => {
      expect(called1).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabClose', () => {
      expect(key1).to.be.eql('tab2');

      expect(currentTabs1).to.be.length(2);
      expect(currentTabs1[0].key).to.be.equal('tab1');
    });
    it('should next tab will be active', () => {
      expect(called2).to.be.equal(true);
      expect(key2).to.be.eql('tab3');

      expect(currentTabs2).to.be.length(2);
      expect(currentTabs2[0].key).to.be.equal('tab1');
    });
  });

  describe('when last selected Tab closed', function () {
    let called1 = false;
    let called2 = false;
    let key1 = '';
    let key2 = '';
    let currentTabs1 = [];
    let currentTabs2 = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs} />);

      let rdTabs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      const tab3CloseButton = TestUtils.findRenderedDOMComponentWithClass(rdTabs[2], 'myCloseButton');
      TestUtils.Simulate.click(React.findDOMNode(tab3CloseButton));
    });

    it('should call onTabClose prop', () => {
      expect(called1).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabClose', () => {
      expect(key1).to.be.eql('tab3');

      expect(currentTabs1).to.be.length(2);
      expect(currentTabs1[0].key).to.be.equal('tab1');
    });
    it('should prev tab will be active', () => {
      expect(called2).to.be.equal(true);
      expect(key2).to.be.eql('tab2');

      expect(currentTabs2).to.be.length(2);
      expect(currentTabs2[0].key).to.be.equal('tab1');
    });
  });

  describe('when dragged', function () {
    let called = false;
    let key = '';
    let currentTabs = [];

    let target1;
    let target2;

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1>tab3Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab4'} title={'tab4'} >
        <div>
          <h1>tab4Content</h1>
        </div>
      </Tab>)

    ];

    beforeEach(() => {
      React.render(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabPositionChange={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />, document.body);
    });

    afterEach(() => {
      React.unmountComponentAtNode(document.body);
      target1 = null;
      target2 = null;
      called = false;
      key = '';
      currentTabs = [];
    });

    //
    it('should not call onTabPositionChanged when droped same position', () => {

      target1 = document.getElementsByClassName('rdTab')[0];
      target2 = document.getElementsByClassName('rdTab')[0];

      let clientY = target1.getBoundingClientRect().top + 5;

      triggerEvent(target1, 'mousedown', {
        clientX: target1.getBoundingClientRect().left + 5,
        clientY: clientY,
        offset: {
          left: target1.getBoundingClientRect().left + 10,
          top: target1.getBoundingClientRect().top + 10
        }
      });

      triggerEvent(target1, 'mousemove', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      triggerEvent(target1, 'mouseup', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      expect(called).to.be.equal(false);
    });

    it('swhich position when droped into next tab', () => {

      target1 = document.getElementsByClassName('rdTab')[0];
      target2 = document.getElementsByClassName('rdTab')[1];

      let clientY = target1.getBoundingClientRect().top + 5;

      triggerEvent(target1, 'mousedown', {
        clientX: target1.getBoundingClientRect().left + 5,
        clientY: clientY,
        offset: {
          left: target1.getBoundingClientRect().left + 10,
          top: target1.getBoundingClientRect().top + 10
        }
      });

      triggerEvent(target1, 'mousemove', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      triggerEvent(target1, 'mouseup', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      expect(called).to.be.equal(true);
      expect(key).to.be.equal('tab1');
      expect(currentTabs).to.be.length(4);
      expect(currentTabs[0].key).to.be.equal('tab2');
      expect(currentTabs[1].key).to.be.equal('tab1');
      expect(currentTabs[2].key).to.be.equal('tab3');
      expect(currentTabs[3].key).to.be.equal('tab4');
    });

    it('slide position when droped into next next tab', () => {

      target1 = document.getElementsByClassName('rdTab')[0];
      target2 = document.getElementsByClassName('rdTab')[2];

      let clientY = target1.getBoundingClientRect().top + 5;
      let droppedToX = target2.getBoundingClientRect().left + 10;

      triggerEvent(target1, 'mousedown', {
        clientX: target1.getBoundingClientRect().left + 5,
        clientY: clientY,
        offset: {
          left: target1.getBoundingClientRect().left + 10,
          top: target1.getBoundingClientRect().top + 10
        }
      });

      triggerEvent(target1, 'mousemove', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      triggerEvent(target1, 'mouseup', {
        clientX: droppedToX,
        clientY: clientY
      });

      expect(called).to.be.equal(true);
      expect(key).to.be.equal('tab1');
      expect(currentTabs).to.be.length(4);
      expect(currentTabs[0].key).to.be.equal('tab2');
      expect(currentTabs[1].key).to.be.equal('tab3');
      expect(currentTabs[2].key).to.be.equal('tab1');
      expect(currentTabs[3].key).to.be.equal('tab4');
    });


    it('swhich position when droped into prev tab', () => {

      target1 = document.getElementsByClassName('rdTab')[1];
      target2 = document.getElementsByClassName('rdTab')[0];

      let clientY = target1.getBoundingClientRect().top + 5;
      let droppedToX = target2.getBoundingClientRect().left + 10;

      triggerEvent(target1, 'mousedown', {
        clientX: target1.getBoundingClientRect().left + 5,
        clientY: clientY,
        offset: {
          left: target1.getBoundingClientRect().left + 10,
          top: target1.getBoundingClientRect().top + 10
        }
      });

      triggerEvent(target1, 'mousemove', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      triggerEvent(target1, 'mouseup', {
        clientX: droppedToX,
        clientY: clientY
      });

      expect(called).to.be.equal(true);
      expect(key).to.be.equal('tab2');
      expect(currentTabs).to.be.length(4);
      expect(currentTabs[0].key).to.be.equal('tab2');
      expect(currentTabs[1].key).to.be.equal('tab1');
      expect(currentTabs[2].key).to.be.equal('tab3');
      expect(currentTabs[3].key).to.be.equal('tab4');
    });

    it('slide position when droped into prev prev tab', () => {

      target1 = document.getElementsByClassName('rdTab')[2];
      target2 = document.getElementsByClassName('rdTab')[0];

      let clientY = target1.getBoundingClientRect().top + 5;
      let droppedToX = target2.getBoundingClientRect().left + 10;

      triggerEvent(target1, 'mousedown', {
        clientX: target1.getBoundingClientRect().left + 5,
        clientY: clientY,
        offset: {
          left: target1.getBoundingClientRect().left + 10,
          top: target1.getBoundingClientRect().top + 10
        }
      });

      triggerEvent(target1, 'mousemove', {
        clientX: target2.getBoundingClientRect().left + 10,
        clientY: clientY
      });

      triggerEvent(target1, 'mouseup', {
        clientX: droppedToX,
        clientY: clientY
      });

      expect(called).to.be.equal(true);
      expect(key).to.be.equal('tab3');
      expect(currentTabs).to.be.length(4);
      expect(currentTabs[0].key).to.be.equal('tab3');
      expect(currentTabs[1].key).to.be.equal('tab1');
      expect(currentTabs[2].key).to.be.equal('tab2');
      expect(currentTabs[3].key).to.be.equal('tab4');
    });
  });

  describe('when close shortcut key binded', function () {
    let called = false;
    let key = '';

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabClose={function(e, _key, _currentTabs){called = true; key = _key; }}
          selectedTab="tab1"
          tabs={tabs}
          shortCutKeys={
            {
              'close': ['alt+command+w', 'alt+ctrl+w'],
              'create': ['alt+command+t', 'alt+ctrl+t'],
              'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
              'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
            }
          } />);
      Mousetrap.trigger('alt+command+w');
    });

    it('keyboard event should call onTabClose prop', () => {
      expect(called).to.be.equal(true);
      expect(key).to.be.eql('tab1');
    });
  });

  describe('when crateTab shortcut key binded', function () {
    let called = false;

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabAddButtonClick={function(e, _key, _currentTabs){called = true; }}
          selectedTab="tab1"
          tabs={tabs}
          shortCutKeys={
            {
              'close': ['alt+command+w', 'alt+ctrl+w'],
              'create': ['alt+command+t', 'alt+ctrl+t'],
              'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
              'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
            }
          } />);
      Mousetrap.trigger('alt+command+t');
    });

    it('keyboard event should call onTabAddButtonClick prop', () => {
      expect(called).to.be.equal(true);
    });
  });

  describe('when moveRight shortcut key binded', function () {
    let called = false;
    let key = '';
    let currentTabs = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabSelect={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs}
          shortCutKeys={
            {
              'close': ['alt+command+w', 'alt+ctrl+w'],
              'create': ['alt+command+t', 'alt+ctrl+t'],
              'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
              'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
            }
          } />);
      Mousetrap.trigger('alt+command+tab');
    });

    it('keyboard event should call tabSelect prop #1', () => {
      expect(called).to.be.equal(true);
      expect(key).to.be.equal('tab2');
    });

    it('keyboard event should call tabSelect prop #2', () => {
      Mousetrap.trigger('alt+command+tab');
      expect(key).to.be.equal('tab3');
    });

    it('keyboard event should call tabSelect prop #3, and move to first if current tab is last', () => {
      Mousetrap.trigger('alt+command+tab');
      expect(key).to.be.equal('tab1');
    });

  });

  describe('when moveLeft shortcut key binded', function () {
    let called = false;
    let key = '';
    let currentTabs = [];

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} >
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} >
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];

    before(() => {
      component = TestUtils.renderIntoDocument(
        <Tabs
          onTabSelect={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs}
          shortCutKeys={
            {
              'close': ['alt+command+w', 'alt+ctrl+w'],
              'create': ['alt+command+t', 'alt+ctrl+t'],
              'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
              'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
            }
          } />);
      Mousetrap.trigger('shift+alt+command+tab');
    });

    it('keyboard event should call tabSelect prop #1', () => {
      expect(called).to.be.equal(true);
      expect(key).to.be.equal('tab2');
    });

    it('keyboard event should call tabSelect prop #2', () => {
      Mousetrap.trigger('shift+alt+command+tab');
      expect(key).to.be.equal('tab1');
    });

    it('keyboard event should call tabSelect prop #3, and move to last if current tab is first', () => {
      Mousetrap.trigger('shift+alt+command+tab');
      expect(key).to.be.equal('tab3');
    });

  });


});
