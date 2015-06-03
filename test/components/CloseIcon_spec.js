'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;
import CloseIcon from '../../components/CloseIcon';
const {TestUtils} = React.addons;

describe('Test of CloseIcon', () => {
  const style = {color:'red'};
  const hoverStyle = {color:'yellow'};
  const className = 'myClass';

  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = TestUtils.renderIntoDocument(<CloseIcon style={style} className={className}>&times;</CloseIcon>);
    expect(component.props.hoverStyle).to.be.empty;
    expect(typeof component.props.onClick).to.be.equal('function');
  });


  it('should pass style and className to renderd child', function () {
    component = <CloseIcon style={style} className={className}>&times;</CloseIcon>;
    let renderer = TestUtils.createRenderer();
    renderer.render(component);
    let output = renderer.getRenderOutput();

    expect(output.props.className).to.be.equal('myClass');
    expect(output.props.style.color).to.be.equal('red');
  });

  it('should call onClick when clicked', function () {
    let called = false;
    component = TestUtils.renderIntoDocument(
      <CloseIcon style={style} className={className} onClick={function(){called = true; }}>&times;</CloseIcon>
    );
    const span = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
    TestUtils.Simulate.click(React.findDOMNode(span));
    expect(called).to.be.equal(true);
  });

  describe('handle mouseOver/mouseOut', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <CloseIcon style={style} className={className} hoverStyle={hoverStyle}>&times;</CloseIcon>
      );
    });

    it('should update style and className on mouseOver', function () {
      const span = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
      TestUtils.SimulateNative.mouseOver(span);
      expect(React.findDOMNode(span).classList.contains('hover')).to.be.equal(true);
      expect(React.findDOMNode(span).style.color).to.be.equal('yellow');
    });

    it('should update style and className on mouseOut', function () {
      const span = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
      TestUtils.SimulateNative.mouseOut(span);
      expect(React.findDOMNode(span).classList.contains('hover')).to.be.equal(false);
      expect(React.findDOMNode(span).style.color).to.be.equal('red');
    });
  });


});
