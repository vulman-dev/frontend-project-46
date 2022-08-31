import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      return `${acc}\n  + ${key}: ${obj2[key]}`;
    }
    if (!Object.hasOwn(obj2, key)) {
      return `${acc}\n  - ${key}: ${obj1[key]}`;
    }
    if (obj1[key] === obj2[key]) {
      return `${acc}\n    ${key}: ${obj1[key]}`;
    }

    return `${acc}\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
  }, '{');

  return `${result}\n}`;
};

export default genDiff;
