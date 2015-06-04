'use strict';
import React from 'react/addons';
import chai from 'chai';
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

    expect(component.props.tabClassNames).to.be.an('object');
    expect(component.props.tabClassNames.tabBar).to.be.equal('');
    expect(component.props.tabClassNames.tabBarAfter).to.be.equal('');
    expect(component.props.tabClassNames.tab).to.be.equal('');
    expect(component.props.tabClassNames.tabBefore).to.be.equal('');
    expect(component.props.tabClassNames.tabAfter).to.be.equal('');
    expect(component.props.tabClassNames.tabTitle).to.be.equal('');
    expect(component.props.tabClassNames.tabCloseIcon).to.be.equal('');
    expect(component.props.tabClassNames.tabActive).to.be.equal('');

    expect(component.props.tabStyles).to.be.empty;

    expect(component.props.tabAddButton.type).to.be.equal('span');

    expect(typeof component.props.onTabSelected).to.be.equal('function');
    expect(typeof component.props.onTabClosed).to.be.equal('function');
    expect(typeof component.props.onTabAddButtonClicked).to.be.equal('function');
    expect(typeof component.props.onTabPositionChanged).to.be.equal('function');
  });


  describe('render tabs and selected tab content', function(){

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
      expect(content).to.be.length(1);
      expect(React.findDOMNode(content[0]).textContent).to.be.equal('tab1Content');
    });
  });

  describe('add custom className to each element ', function(){

    const tabClassNames = {
      tabBar: 'myTabBar',
      tabBarAfter: 'myTabBarAfter',
      tab:      'myTab',
      tabTitle: 'myTabTitle',
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
          tabClassNames={tabClassNames}
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

      let rdTabActive = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      expect(React.findDOMNode(rdTabActive).className).contain('myTabActive');

      let rdTabCloseIconb = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabCloseIcon');
      expect(React.findDOMNode(rdTabCloseIconb).className).contain('myTabCloseIcon');

    });

  });


  describe('overwite inline style ', function(){

    const tabStyles = {
      tabBar: {fontSize: '101px'},
      tabBarAfter: {fontSize: '102px'},
      tab: {fontSize: '103px'},
      tabBefore: {fontSize: '104px'},
      tabAfter: {fontSize: '105px'},
      tabTitle: {fontSize: '106px'},
      tabActive: {fontSize: '107px'},
      tabTitleActive: {fontSize: '108px'},
      tabBeforeActive: {fontSize: '109px'},
      tabAfterActive: {fontSize: '110px'}
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
          tabStyles={tabStyles}
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

    });

  });

  describe('when TabAddButtonClicked clicked', function () {
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
          onTabAddButtonClicked={function(e, _currentTabs){called = true; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      const button = TestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAddButton');
      TestUtils.Simulate.click(React.findDOMNode(button));
    });

    it('should call onTabAddButtonClicked prop', () => {
      expect(called).to.be.equal(true);
    });
    it('should pass currentTabs to onTabAddButtonClicked', () => {
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
          onTabSelected={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      let rdTabTitles = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      TestUtils.Simulate.click(React.findDOMNode(rdTabTitles[2]));
    });

    it('should call onTabSelected prop', () => {
      expect(called).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabSelected', () => {
      expect(key).to.be.eql('tab3');

      expect(currentTabs).to.be.length(3);
      expect(currentTabs[0].key).to.be.equal('tab1');
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
          tabClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClosed={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelected={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs} />);

      let rdTabs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      const tab2CloseButton = TestUtils.findRenderedDOMComponentWithClass(rdTabs[1], 'myCloseButton');
      TestUtils.Simulate.click(React.findDOMNode(tab2CloseButton));
    });

    it('should call onTabClosed prop', () => {
      expect(called1).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabClosed', () => {
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
          tabClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClosed={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelected={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab2"
          tabs={tabs} />);

        let rdTabs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
        const tab2CloseButton = TestUtils.findRenderedDOMComponentWithClass(rdTabs[1], 'myCloseButton');
        TestUtils.Simulate.click(React.findDOMNode(tab2CloseButton));
    });

    it('should call onTabClosed prop', () => {
      expect(called1).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabClosed', () => {
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
          tabClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClosed={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelected={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs} />);

      let rdTabs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      const tab3CloseButton = TestUtils.findRenderedDOMComponentWithClass(rdTabs[2], 'myCloseButton');
      TestUtils.Simulate.click(React.findDOMNode(tab3CloseButton));
    });

    it('should call onTabClosed prop', () => {
      expect(called1).to.be.equal(true);
    });
    it('should pass key and currentTabs to onTabClosed', () => {
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
          tabClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabPositionChanged={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
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
      expect(currentTabs[1].key).to.be.equal('tab3');
      expect(currentTabs[2].key).to.be.equal('tab1');
      expect(currentTabs[3].key).to.be.equal('tab4');
    });


    it('swhich position when droped into prev tab', () => {

      target1 = document.getElementsByClassName('rdTab')[1];
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
      expect(key).to.be.equal('tab3');
      expect(currentTabs).to.be.length(4);
      expect(currentTabs[0].key).to.be.equal('tab3');
      expect(currentTabs[1].key).to.be.equal('tab1');
      expect(currentTabs[2].key).to.be.equal('tab2');
      expect(currentTabs[3].key).to.be.equal('tab4');
    });
  });

});
