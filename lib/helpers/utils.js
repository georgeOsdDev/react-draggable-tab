"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var slideArray = function (array, a, b) {
  var retArr = void 0;
  var xarray = array.slice(0);

  if (a < b) {
    retArr = xarray.map(function (v, idx) {
      if (idx < a) {
        return v;
      } else if (a <= idx && idx < b) {
        return array[idx + 1];
      } else if (idx === b) {
        return array[a];
      }
      return v;
    });
  } else {
    retArr = xarray.map(function (v, idx) {
      if (idx < b) {
        return v;
      } else if (b === idx) {
        return array[a];
      } else if (b < idx && idx <= a) {
        return array[idx - 1];
      }
      return v;
    });
  }
  return retArr;
};

exports.default = {
  slideArray: slideArray
};