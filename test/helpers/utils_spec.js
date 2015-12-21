'use strict';
import chai from 'chai';
let expect = chai.expect;
import Utils from '../../src/helpers/utils';

describe('Test of utils', () => {

  describe('utils offer slideArray helper', () => {
    let src = ['a', 'b', 'c', 'd', 'e'];

    it('swap position of array element, if nextElement\'s index = fromElement index + 1', (done) => {
      let swapped = Utils.slideArray(src, 0, 1);
      expect(swapped).to.be.eql(['b', 'a', 'c', 'd', 'e']);

      let swapped2 = Utils.slideArray(src, 1, 2);
      expect(swapped2).to.be.eql(['a', 'c', 'b', 'd', 'e']);
      done();
    });

    it('swap position of array element, if nextElement\'s index = fromElement index - 1', (done) => {
      let swapped = Utils.slideArray(src, 1, 0);
      expect(swapped).to.be.eql(['b', 'a', 'c', 'd', 'e']);

      let swapped2 = Utils.slideArray(src, 2, 1);
      expect(swapped2).to.be.eql(['a', 'c', 'b', 'd', 'e']);
      done();
    });

    it('slide positions of array element, if nextElement\'s index > fromElement index + 1', (done) => {
      let swapped = Utils.slideArray(src, 0, 2);
      expect(swapped).to.be.eql(['b', 'c', 'a', 'd', 'e']);

      let swapped2 = Utils.slideArray(src, 1, 4);
      expect(swapped2).to.be.eql(['a', 'c', 'd', 'e', 'b']);
      done();
    });

    it('slide positions of array element, if nextElement\'s index > fromElement index - 1', (done) => {
      let swapped = Utils.slideArray(src, 2, 0);
      expect(swapped).to.be.eql(['c', 'a', 'b', 'd', 'e']);

      let swapped2 = Utils.slideArray(src, 4, 1);
      expect(swapped2).to.be.eql(['a', 'e', 'b', 'c', 'd']);
      done();
    });

  });
});
