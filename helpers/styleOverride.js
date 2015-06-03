'use strict';

import Immutable from "immutable";

let merge = (original, override) => {
  return Immutable.Map(original).merge(override).toObject();
};

export default {merge: merge};
