'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
let expect = chai.expect;
import TabTemplate from '../../components/TabTemplate';

describe('Test of TabTemplate', () => {
  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = ReactTestUtils.renderIntoDocument(<TabTemplate><p>test tab</p></TabTemplate>);
    expect(component.props.selected).to.be.equal(false);
  });

  it('It will be height 0 none when not selected', () => {
    component = ReactTestUtils.renderIntoDocument(<TabTemplate selected={false} ><p>not test tab</p></TabTemplate>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).parentNode.style.height).to.be.equal('0px');
  });

  it('It will have visible height when selected', () => {
    component = ReactTestUtils.renderIntoDocument(<TabTemplate selected={true}><p>not test tab</p></TabTemplate>);
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(ReactDom.findDOMNode(p).parentNode.style.height).to.be.not.equal('0px');
  });
});
