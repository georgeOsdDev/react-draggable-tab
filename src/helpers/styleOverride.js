import Immutable from 'immutable';

// eslint-disable-next-line new-cap
const merge = (original, override) => Immutable.Map(original).merge(override).toObject();

export default {
  merge,
};
