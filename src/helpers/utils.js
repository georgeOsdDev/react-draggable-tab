let slideArray = (array, a, b) => {
  let retArr;
  let _array = array.slice(0);

  if (a < b) {
    retArr = _array.map((v, idx) => {
      if (idx < a) {
        return v;
      } else if (a <= idx && idx < b) {
        return array[idx + 1];
      } else if (idx === b) {
        return array[a];
      } else {
        return v;
      }
    });
  } else {
    retArr = _array.map((v, idx) => {
      if (idx < b) {
        return v;
      } else if (b === idx) {
        return array[a];
      } else if (b < idx && idx <= a) {
        return array[idx - 1];
      } else {
        return v;
      }
    });
  }
  return retArr;
};

export default {slideArray: slideArray};
