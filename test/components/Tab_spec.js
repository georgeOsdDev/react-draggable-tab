'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;
import Tab from '../../components/Tab';
const {TestUtils} = React.addons;

describe('Test of Tab', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Tab title={'Hello'}><p>test tab</p></Tab>);
  });

  it('Tab works like a scala case class, it just render it\'s children', () => {
    const p = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(React.findDOMNode(p).textContent).to.be.equal('test tab');
  });
});
