'use strict';
import chai  from 'chai';
let expect = chai.expect;
import StyleOverride from '../../src/helpers/styleOverride';

describe('Test of styleOverride', () => {

  describe('styleOverride offer merge helper', () => {
    let src = {
      color:'red',
      fontSize:'10px'
    };

    let src2 = {
      color: 'blue',
      textAlign: 'center'
    };

    it('merge source style with other style', (done) => {
      let result = StyleOverride.merge(src, src2);
      expect(result).to.be.eql({
        color: 'blue',
        fontSize:'10px',
        textAlign: 'center'
      });
      done();
    });
  });
});
