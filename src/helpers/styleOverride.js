import Immutable from 'immutable';

const merge = (original, override) => Immutable.Map(original).merge(override).toObject();

export default {
  merge,
};
