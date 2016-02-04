'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
let expect = chai.expect;
import TabContainer from '../../src/components/TabContainer';

describe('Test of TabContainer', () => {
  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = ReactTestUtils.renderIntoDocument(<TabContainer><p>test tab</p></TabContainer>);
    expect(component.props.selected).to.be.equal(false);
  });

  it('It will be height 0 when not selected', () => {
    component = ReactTestUtils.renderIntoDocument(<TabContainer selected={false} ><p>not test tab</p></TabContainer>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).parentNode.style.height).to.be.equal('0px');
  });

  it('It will have visible height when selected', () => {
    component = ReactTestUtils.renderIntoDocument(<TabContainer selected={true}><p>not test tab</p></TabContainer>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).parentNode.style.height).to.be.not.equal('0px');
  });

  it('It will be height 0 with custom style when not selected', () => {
    component = ReactTestUtils.renderIntoDocument(<TabContainer selected={false} style={{color: 'red'}}><p>not test tab</p></TabContainer>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).parentNode.style.height).to.be.equal('0px');
    expect(ReactDom.findDOMNode(p).parentNode.style.color).to.be.equal('red');
  });

  it('It will have visible height with custom style when selected', () => {
    component = ReactTestUtils.renderIntoDocument(<TabContainer selected={true} style={{color: 'red'}}><p>not test tab</p></TabContainer>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).parentNode.style.height).to.be.not.equal('0px');
    expect(ReactDom.findDOMNode(p).parentNode.style.color).to.be.equal('red');
  });

});
