'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import chai from 'chai';
let expect = chai.expect;
import CloseIcon from '../../src/components/CloseIcon';

describe('Test of CloseIcon', () => {
  const style = {color:'red'};
  const hoverStyle = {color:'yellow'};
  const className = 'myClass';

  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = ReactTestUtils.renderIntoDocument(<CloseIcon style={style} className={className}>&times;</CloseIcon>);
    expect(component.props.hoverStyle).to.be.empty;
    expect(typeof component.props.onClick).to.be.equal('function');
  });


  it('should pass style and className to renderd child', function () {
    component = <CloseIcon style={style} className={className}>&times;</CloseIcon>;
    let renderer = new ShallowRenderer();
    renderer.render(component);
    let output = renderer.getRenderOutput();

    expect(output.props.className).to.be.equal('myClass');
    expect(output.props.style.color).to.be.equal('red');
  });

  it('should call onClick when clicked', function () {
    let called = false;
    component = ReactTestUtils.renderIntoDocument(
      <CloseIcon style={style} className={className} onClick={function(){called = true; }}>&times;</CloseIcon>
    );
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span');
    ReactTestUtils.Simulate.click(ReactDom.findDOMNode(span));
    expect(called).to.be.equal(true);
  });

  describe('handle mouseEnter/mouseLeave', () => {
    beforeEach(() => {
      component = ReactTestUtils.renderIntoDocument(
        <CloseIcon style={style} className={className} hoverStyle={hoverStyle}>&times;</CloseIcon>
      );
    });

    it('should update style and className on mouseEnter', function () {
      const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span');
      ReactTestUtils.Simulate.mouseEnter(span);
      expect(ReactDom.findDOMNode(span).classList.contains('hover')).to.be.equal(true);
      expect(ReactDom.findDOMNode(span).style.color).to.be.equal('yellow');
    });

    it('should update style and className on mouseLeave', function () {
      const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span');
      ReactTestUtils.Simulate.mouseLeave(span);
      expect(ReactDom.findDOMNode(span).classList.contains('hover')).to.be.equal(false);
      expect(ReactDom.findDOMNode(span).style.color).to.be.equal('red');
    });
  });


});
