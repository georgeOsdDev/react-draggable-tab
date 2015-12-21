'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = function merge(original, override) {
  return _immutable2.default.Map(original).merge(override).toObject();
};

exports.default = { merge: merge };