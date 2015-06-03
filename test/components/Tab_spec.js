'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;
import Tab from '../../components/Tab';
const {TestUtils} = React.addons;

describe('Test of Tab', () => {
  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = TestUtils.renderIntoDocument(<Tab><p>test tab</p></Tab>);
    expect(component.props.title).to.be.equal('untitled');
    expect(component.props.disableClose).to.be.equal(false);
  });

  it('Tab works like a scala case class, it just render it\'s children', () => {
    component = TestUtils.renderIntoDocument(<Tab title={'Hello'} ><p>test tab</p></Tab>);
    const p = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
    expect(React.findDOMNode(p).textContent).to.be.equal('test tab');
  });
});
