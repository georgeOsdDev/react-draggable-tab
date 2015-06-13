'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;
import TabTemplate from '../../components/TabTemplate';
const {TestUtils} = React.addons;

describe('Test of TabTemplate', () => {
  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = TestUtils.renderIntoDocument(<TabTemplate><p>test tab</p></TabTemplate>);
    expect(component.props.selected).to.be.equal(false);
  });

  it('It will be height 0 none when not selected', () => {
    component = TestUtils.renderIntoDocument(<TabTemplate selected={false} ><p>not test tab</p></TabTemplate>);
    const p = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(React.findDOMNode(p).parentNode.style.height).to.be.equal('0px');
  });

  it('It will have visible height when selected', () => {
    component = TestUtils.renderIntoDocument(<TabTemplate selected={true}><p>not test tab</p></TabTemplate>);
    const p = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(React.findDOMNode(p).parentNode.style.height).to.be.not.equal('0px');
  });
});
