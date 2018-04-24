'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import chai from 'chai';
let expect = chai.expect;
import Tab from '../../src/components/Tab';

describe('Test of Tab', () => {
  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = ReactTestUtils.renderIntoDocument(<Tab><p>test tab</p></Tab>);
    expect(component.props.title).to.be.equal('untitled');
    expect(component.props.unclosable).to.be.equal(false);

    expect(component.props.tabClassNames).to.be.an('object');
    expect(component.props.tabClassNames.tab).to.be.equal('');
    expect(component.props.tabClassNames.tabBefore).to.be.equal('');
    expect(component.props.tabClassNames.tabAfter).to.be.equal('');
    expect(component.props.tabClassNames.tabTitle).to.be.equal('');
    expect(component.props.tabClassNames.tabBeforeTitle).to.be.equal('');
    expect(component.props.tabClassNames.tabAfterTitle).to.be.equal('');
    expect(component.props.tabClassNames.tabCloseIcon).to.be.equal('');
    expect(component.props.tabClassNames.tabActive).to.be.equal('');
    expect(component.props.tabClassNames.tabHover).to.be.equal('');

    expect(component.props.tabStyles).to.be.empty;
    expect(component.props.containerStyle).to.be.empty;

  });

  it('Tab works like a scala case class, it just render it\'s children', () => {
    component = ReactTestUtils.renderIntoDocument(<Tab title={'Hello'} ><p>test tab</p></Tab>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).textContent).to.be.equal('test tab');
  });

  it('String can use as title', () => {
    component = ReactTestUtils.renderIntoDocument(<Tab title={'Hello'} ><p>test tab</p></Tab>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).textContent).to.be.equal('test tab');
  });

  it('Element can use as title', () => {
    component = ReactTestUtils.renderIntoDocument(<Tab title={<span>HELLO</span>} ><p>test tab</p></Tab>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).textContent).to.be.equal('test tab');
  });
});
