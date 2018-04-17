import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import chai from 'chai';
import Mousetrap from 'mousetrap';
let expect = chai.expect;
import triggerEvent from '../triggerEvent.js';

import Tabs from '../../src/components/Tabs';
import Tab from '../../src/components/Tab';

describe('Test of Tabs', () => {
  let component;

  beforeEach(() => {
    // component = ReactTestUtils.renderIntoDocument(<Tabs></Tabs>);
  });

  it('should have default properties', function () {
    component = ReactTestUtils.renderIntoDocument(<Tabs/>);

    expect(component.props.tabsClassNames).to.be.an('object');
    expect(component.props.tabsClassNames.tabWrapper).to.be.equal('');
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
    expect(component.props.tabsClassNames.tabHover).to.be.equal('');
    expect(component.props.disableDrag).to.be.equal(false);

    expect(component.props.tabsStyles).to.be.empty;

    expect(component.props.tabAddButton.type).to.be.equal('span');

    expect(component.props.shortCutKeys).to.be.empty;

    expect(typeof component.props.onTabSelect).to.be.equal('function');
    expect(typeof component.props.onTabClose).to.be.equal('function');
    expect(typeof component.props.onTabAddButtonClick).to.be.equal('function');
    expect(typeof component.props.shouldTabClose).to.be.equal('function');
    expect(typeof component.props.onTabPositionChange).to.be.equal('function');
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
      class Wrapper extends React.Component {
        getInitialState() {
          return {foo: 1};
        }
        update() {
          this.setState({foo: 2});
        }
        render() {
          return <div><Tabs
            selectedTab="tab1"
            tabs={tabs} /></div>;
        }
      }
      component = ReactTestUtils.renderIntoDocument(<Wrapper />);
    });

    it('render tab title as list', function(){
      let titles = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(titles).to.be.length(3);
      expect(titles[0].textContent).to.be.equal('tab1');
      expect(titles[1].textContent).to.be.equal('tab2');
      expect(titles[2].textContent).to.be.equal('tab3');
    });

    it('render tab title as title attribute', function(){
      let titles = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(titles).to.be.length(3);
      expect(titles[0].title).to.be.equal('tab1');
      expect(titles[1].title).to.be.equal('tab2');
      expect(titles[2].title).to.be.equal('tab3');
    });

    it('render first tab as selected', function(){
      let activeTab = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      let title = activeTab.querySelector('p');
      expect(title.textContent).to.be.equal('tab1');
    });

    it('render first tab\'s content', function(){
      let content = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'h1');
      expect(content).to.be.length(3);
      expect(content[0].textContent).to.be.equal('tab1Content');
      expect(content[0].parentNode.style.height).to.be.not.equal('0px');
      expect(content[1].textContent).to.be.equal('tab2Content');
      expect(content[1].parentNode.style.height).to.be.equal('0px');
      expect(content[2].textContent).to.be.equal('tab3Content');
      expect(content[2].parentNode.style.height).to.be.equal('0px');
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render tab title as list', function(){
      let children = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
      expect(children).to.be.length(4);

      let t1 = children[0].querySelector('.rdTabTitle');
      expect(t1.textContent).to.be.equal('tab1');

      let t2 = children[1].querySelector('.rdTabTitle');
      expect(t2.textContent).to.be.equal('tab2');

      let t3 = children[2].querySelector('.rdTabTitle');
      expect(t3.textContent).to.be.equal('tab3');

      expect(children[3].className).to.be.equal('rdTabAddButton');
    });

    it('will not render tab title as title attribute', function(){
      let children = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
      expect(children).to.be.length(4);

      let t1 = children[0].querySelector('.rdTabTitle');
      expect(t1.title).to.be.equal('');

      let t2 = children[1].querySelector('.rdTabTitle');
      expect(t2.title).to.be.equal('');

      let t3 = children[2].querySelector('.rdTabTitle');
      expect(t3.title).to.be.equal('');
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          selectedTab="tab1"
          tabs={tabs} />);
      children = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
    });

    it('will insert custome element before title', () => {
      let t1BeforeTitle = children[0].querySelector('.rdTabBeforeTitle');
      let t1BeforeTitleIcon = t1BeforeTitle.querySelector('i');
      expect(t1BeforeTitleIcon.className.indexOf('icon1') > 0).to.be.equal(true);

      let t1AfterTitle = children[0].querySelector('.rdTabAfterTitle');
      let t1AfterTitleIcon = t1AfterTitle.querySelector('i');
      expect(t1AfterTitleIcon).to.be.eql(null);
    });

    it('will insert custome element affter title', () => {
      let t2BeforeTitle = children[1].querySelector('.rdTabBeforeTitle');
      let t2BeforeTitleIcon = t2BeforeTitle.querySelector('i');
      expect(t2BeforeTitleIcon).to.be.eql(null);

      let t2AfterTitle = children[1].querySelector('.rdTabAfterTitle');
      let t2AfterTitleIcon = t2AfterTitle.querySelector('i');
      expect(t2AfterTitleIcon.className.indexOf('icon2') > 0).to.be.equal(true);
    });

    it('will insert custome element before/affter title', () => {
      let t3BeforeTitle = children[2].querySelector('.rdTabBeforeTitle');
      let t3BeforeTitleIcon = t3BeforeTitle.querySelector('i');
      expect(t3BeforeTitleIcon.className.indexOf('icon3') > 0).to.be.equal(true);

      let t3AfterTitle = children[2].querySelector('.rdTabAfterTitle');
      let t3AfterTitleIcon = t3AfterTitle.querySelector('i');
      expect(t3AfterTitleIcon.className.indexOf('icon4') > 0).to.be.equal(true);
    });
  });

  describe('add custom className to all tabs ', function(){

    const tabsClassNames = {
      tabWrapper: 'myWrapper',
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={tabsClassNames}
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render elements with custome class', function(){

      let wrapper = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabWrapper');
      expect(wrapper.className).contain('myWrapper');

      let rdTabBar = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(rdTabBar.className).contain('myTabBar');

      let rdTabBarAfter = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(rdTabBarAfter.className).contain('myTabBarAfter');

      let rdTab = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTab');
      expect(rdTab.className).contain('myTab');

      let rdTabBefore = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBefore');
      expect(rdTabBefore.className).contain('myTabBefore');

      let rdTabAfter = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAfter');
      expect(rdTabAfter.className).contain('myTabAfter');

      let rdTabTitle = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabTitle');
      expect(rdTabTitle.className).contain('myTabTitle');

      let rdTabBeforeTitle = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBeforeTitle');
      expect(rdTabBeforeTitle.className).contain('myTabBeforeTitle');

      let rdTabAfterTitle = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAfterTitle');
      expect(rdTabAfterTitle.className).contain('myTabAfterTitle');

      let rdTabActive = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      expect(rdTabActive.className).contain('myTabActive');

      let rdTabCloseIconb = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabCloseIcon');
      expect(rdTabCloseIconb.className).contain('myTabCloseIcon');

    });

  });


  describe('overwite inline style to all tabs', function(){

    const tabsStyles = {
      tabWrapper: {fontSize: '100px'},
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
      tabCloseIcon: {fontSize: '111px'},
      tabOnHover: {fontSize: '112px'},
      tabTitleOnHover: {fontSize: '113px'},
      tabBeforeOnHover: {fontSize: '114px'},
      tabAfterOnHover: {fontSize: '115px'}
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsStyles={tabsStyles}
          selectedTab="tab2"
          tabs={tabs} />);
    });

    it('render elements with custome inline-style', function(){
      let rdTabWrapper = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabWrapper');
      expect(rdTabWrapper.style.fontSize).to.be.eql('100px');

      let rdTabBar = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(rdTabBar.style.fontSize).to.be.eql('101px');

      let rdTabBarAfter = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(rdTabBarAfter.style.fontSize).to.be.eql('102px');

      let rdTab = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(rdTab[0].style.fontSize).to.be.eql('103px');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[0].style.fontSize).to.be.eql('104px');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[0].style.fontSize).to.be.eql('105px');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[0].style.fontSize).to.be.eql('106px');

      let activeTab = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');

      expect(activeTab.style.fontSize).to.be.eql('107px');

      let rdTabTitleActive = activeTab.querySelector('.rdTabTitle');
      expect(rdTabTitleActive.style.fontSize).to.be.eql('108px');

      let rdTabBeforeActive = activeTab.querySelector('.rdTabBefore');
      expect(rdTabBeforeActive.style.fontSize).to.be.eql('109px');

      let rdTabAfterActive = activeTab.querySelector('.rdTabAfter');
      expect(rdTabAfterActive.style.fontSize).to.be.eql('110px');

      let rdTabCloseIcon = activeTab.querySelector('.rdTabCloseIcon');
      expect(rdTabCloseIcon.style.fontSize).to.be.eql('111px');

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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={tabsClassNames}
          selectedTab="tab1"
          tabs={tabs} />);
    });

    it('render elements with custome class', function(){
      let rdTabBar = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(rdTabBar.className).contain('myTabBar');

      let rdTabBarAfter = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(rdTabBarAfter.className).contain('myTabBarAfter');

      let rdTab = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(rdTab[0].className).contain('mySpecialTab');
      expect(rdTab[1].className).not.contain('mySpecialTab');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[0].className).contain('mySpecialTabBefore');
      expect(rdTabBefore[1].className).not.contain('mySpecialTabBefore');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[0].className).contain('mySpecialTabAfter');
      expect(rdTabAfter[1].className).not.contain('mySpecialTabAfter');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[0].className).contain('mySpecialTabTitle');
      expect(rdTabTitle[1].className).not.contain('mySpecialTabTitle');

      let rdTabBeforeTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBeforeTitle');
      expect(rdTabBeforeTitle[0].className).contain('mySpecialTabBeforeTitle');
      expect(rdTabBeforeTitle[1].className).not.contain('mySpecialTabBeforeTitle');

      let rdTabAfterTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfterTitle');
      expect(rdTabAfterTitle[0].className).contain('mySpecialTabAfterTitle');
      expect(rdTabAfterTitle[1].className).not.contain('mySpecialTabAfterTitle');

      let rdTabActive = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');
      expect(rdTabActive.className).contain('mySpecialTabActive');

      let rdTabCloseIcon = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabCloseIcon');
      expect(rdTabCloseIcon[0].className).contain('mySpecialTabCloseIcon');
      expect(rdTabCloseIcon[1].className).not.contain('mySpecialTabCloseIcon');

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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsStyles={tabsStyles}
          selectedTab="tab2"
          tabs={tabs} />);
    });

    it('render elements with custome inline-style', function(){
      let rdTabBar = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBar');
      expect(rdTabBar.style.fontSize).to.be.eql('101px');

      let rdTabBarAfter = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabBarAfter');
      expect(rdTabBarAfter.style.fontSize).to.be.eql('102px');

      let rdTab = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      expect(rdTab[0].style.fontSize).to.be.eql('103px');
      expect(rdTab[2].style.fontSize).to.be.eql('301px');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[0].style.fontSize).to.be.eql('104px');
      expect(rdTabBefore[2].style.fontSize).to.be.eql('302px');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[0].style.fontSize).to.be.eql('105px');
      expect(rdTabAfter[2].style.fontSize).to.be.eql('303px');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[0].style.fontSize).to.be.eql('106px');
      expect(rdTabTitle[2].style.fontSize).to.be.eql('304px');

      let activeTab = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabActive');

      expect(activeTab.style.fontSize).to.be.eql('205px');

      let rdTabTitleActive = activeTab.querySelector('.rdTabTitle');
      expect(rdTabTitleActive.style.fontSize).to.be.eql('206px');

      let rdTabBeforeActive = activeTab.querySelector('.rdTabBefore');
      expect(rdTabBeforeActive.style.fontSize).to.be.eql('207px');

      let rdTabAfterActive = activeTab.querySelector('.rdTabAfter');
      expect(rdTabAfterActive.style.fontSize).to.be.eql('208px');

      let rdTabCloseIcon = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabCloseIcon');
      expect(rdTabCloseIcon[0].style.fontSize).to.be.eql('111px');
      expect(rdTabCloseIcon[1].style.fontSize).to.be.eql('209px');
      expect(rdTabCloseIcon[2].style.fontSize).to.be.eql('305px');
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          onTabAddButtonClick={function(e, _currentTabs){called = true; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      const button = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'rdTabAddButton');
      ReactTestUtils.Simulate.click(button);
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          onTabSelect={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      let rdTabTitles = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      ReactTestUtils.Simulate.click(rdTabTitles[2]);
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          onTabSelect={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />);

      let rdTabTitles = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      ReactTestUtils.Simulate.click(rdTabTitles[2]);
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs} />);

      let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      const tab2CloseButton = rdTabs[1].querySelector('.myCloseButton');
      ReactTestUtils.Simulate.click(tab2CloseButton);
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab2"
          tabs={tabs} />);

        let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
        const tab2CloseButton = rdTabs[1].querySelector('.myCloseButton');
        ReactTestUtils.Simulate.click(tab2CloseButton);
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          selectedTab="tab3"
          tabs={tabs} />);

      let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      const tab3CloseButton = rdTabs[2].querySelector('.myCloseButton');
      ReactTestUtils.Simulate.click(tab3CloseButton);
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

  describe('when shouldTabClose return false', function () {
    let called1 = false;
    let called2 = false;
    let called3 = false;
    let key1 = '';
    let key2 = '';
    let key3 = '';
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabClose={function(e, _key, _currentTabs){called1 = true; key1 = _key; currentTabs1 = _currentTabs; }}
          onTabSelect={function(e, _key, _currentTabs){called2 = true; key2 = _key; currentTabs2 = _currentTabs; }}
          shouldTabClose={function(e, _key){called3 = true; key3 = _key; return false; }}
          selectedTab="tab2"
          tabs={tabs} />);

        let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
        const tab2CloseButton = rdTabs[1].querySelector('.myCloseButton');
        ReactTestUtils.Simulate.click(tab2CloseButton);
    });

    it('should not call onTabClose prop', () => {
      expect(called1).to.be.equal(false);
    });
    it('should call shouldTabClose prop', () => {
      expect(called3).to.be.equal(true);
    });
    it('should pass key to shouldTabClose', () => {
      expect(key3).to.be.eql('tab2');
    });
    it('should tabs stay ', () => {
      expect(called2).to.be.equal(false);
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
      ReactDom.render(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabPositionChange={function(e, _key, _currentTabs){called = true; key = _key; currentTabs = _currentTabs; }}
          selectedTab="tab1"
          tabs={tabs} />, document.body);
    });

    afterEach(() => {
      ReactDom.unmountComponentAtNode(document.body);
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
  })

  describe('when disabled and attempts to drag', function () {
    let called = false;

    let target1;
    let target2;

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'}>
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'}>
        <div>
          <h1>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'}>
        <div>
          <h1>tab3Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab4'} title={'tab4'}>
        <div>
          <h1>tab4Content</h1>
        </div>
      </Tab>)

    ];

    beforeEach(() => {
      ReactDom.render(
        <Tabs
          tabsClassNames={{tabCloseIcon: 'myCloseButton'}}
          onTabPositionChange={function (e, _key, _currentTabs) {
            called = true;
          }}
          selectedTab="tab1"
          tabs={tabs}
        disableDrag={true}/>, document.body);
    });

    afterEach(() => {
      ReactDom.unmountComponentAtNode(document.body);
      target1 = null;
      target2 = null;
      called = false;
    });

    it('attemp to switch position when dragging is disabled', () => {

      target1 = document.getElementsByClassName('rdTab')[0];
      target2 = document.getElementsByClassName('rdTab')[1];

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

      expect(called).to.be.equal(false);
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
      component = ReactTestUtils.renderIntoDocument(
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
      component = ReactTestUtils.renderIntoDocument(
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
      component = ReactTestUtils.renderIntoDocument(
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
      component = ReactTestUtils.renderIntoDocument(
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


  describe('handle mouseEnter/mouseLeave', () => {
    const tabsClassNames = {
      tabHover: 'myTabHover'
    };
    const tab2ClassNames = {
      tabHover: 'mySpecialTabHover'
    };

    const tabsStyles = {
      tabOnHover: {fontSize: '101px'},
      tabBeforeOnHover: {fontSize: '102px'},
      tabAfterOnHover: {fontSize: '103px'},
      tabTitleOnHover: {fontSize: '104px'}
    };

    const tab2Styles = {
      tabOnHover: {fontSize: '201px'},
      tabBeforeOnHover: {fontSize: '202px'},
      tabAfterOnHover: {fontSize: '203px'},
      tabTitleOnHover: {fontSize: '204px'}
    };

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} >
        <div>
          <h1>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} tabClassNames={tab2ClassNames} tabStyles={tab2Styles}>
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
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          tabsClassNames={tabsClassNames}
          tabsStyles={tabsStyles}
          selectedTab="tab3"
          tabs={tabs} />);
    });

    it('should update style and className on mouseEnter', function () {
      let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      ReactTestUtils.Simulate.mouseEnter(rdTabs[0]);
      expect(ReactDom.findDOMNode(rdTabs[0]).classList.contains('rdTabHover')).to.be.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[0]).classList.contains('myTabHover')).to.be.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[0]).style.fontSize).to.be.equal('101px');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[0].style.fontSize).to.be.eql('102px');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[0].style.fontSize).to.be.eql('103px');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[0].style.fontSize).to.be.eql('104px');
    });

    it('should update style and className on mouseLeave', function () {
      let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      ReactTestUtils.Simulate.mouseLeave(rdTabs[0]);
      expect(ReactDom.findDOMNode(rdTabs[0]).classList.contains('rdTabHover')).to.be.not.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[0]).classList.contains('myTabHover')).to.be.not.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[0]).style.fontSize).to.be.not.equal('101px');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[0].style.fontSize).to.be.not.eql('102px');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[0].style.fontSize).to.be.not.eql('103px');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[0].style.fontSize).to.be.not.eql('104px');
    });

    it('should update style and className with tab customized value on mouseEnter', function () {
      let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      ReactTestUtils.Simulate.mouseEnter(rdTabs[1]);
      expect(ReactDom.findDOMNode(rdTabs[1]).classList.contains('rdTabHover')).to.be.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[1]).classList.contains('myTabHover')).to.be.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[1]).classList.contains('mySpecialTabHover')).to.be.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[1]).style.fontSize).to.be.equal('201px');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[1].style.fontSize).to.be.eql('202px');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[1].style.fontSize).to.be.eql('203px');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[1].style.fontSize).to.be.eql('204px');
    });

    it('should not update style and className on mouseEnter over active tab', function () {
      let rdTabs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTab');
      ReactTestUtils.Simulate.mouseEnter(rdTabs[2]);
      expect(ReactDom.findDOMNode(rdTabs[2]).classList.contains('rdTabHover')).to.be.not.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[2]).classList.contains('myTabHover')).to.be.not.equal(true);
      expect(ReactDom.findDOMNode(rdTabs[2]).style.fontSize).to.be.not.equal('101px');

      let rdTabBefore = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabBefore');
      expect(rdTabBefore[2].style.fontSize).to.be.not.eql('102px');

      let rdTabAfter = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabAfter');
      expect(rdTabAfter[2].style.fontSize).to.be.not.eql('103px');

      let rdTabTitle = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      expect(rdTabTitle[2].style.fontSize).to.be.not.eql('104px');
    });
  });

  describe('Event listeners for each Tab', function () {
    let called1 = false;
    let called2 = false;
    let called3 = false;
    let called4 = false;

    const tabs = [
      (<Tab key={'tab1'} title={'tab1'} onDoubleClick={() => {called1 = true;}}>
        <div>
          <h1 className='tab1click'>tab1Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab2'} title={'tab2'} onDoubleClick={() => {called2 = true;}} onContextMenu={() => {called3 = true;}}>
        <div>
          <h1 className='tab2click'>tab2Content</h1>
        </div>
      </Tab>),
      (<Tab key={'tab3'} title={'tab3'} onContextMenu={() => {called4 = true;}}>
        <div>
          <h1 className='tab3click'>tab3Content</h1>
        </div>
      </Tab>)
    ];
    let rdTabTitles;

    before(() => {
      component = ReactTestUtils.renderIntoDocument(
        <Tabs
          selectedTab="tab1"
          tabs={tabs} />);
      rdTabTitles = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'rdTabTitle');
      ReactTestUtils.Simulate.doubleClick(rdTabTitles[1]);
      ReactTestUtils.Simulate.contextMenu(rdTabTitles[2]);
    });

    it('should call specified listener ', () => {

      expect(called1).to.be.equal(false);
      expect(called2).to.be.equal(true);
      expect(called3).to.be.equal(false);
      expect(called4).to.be.equal(true);
    });
  });



});
