import _ from 'lodash';

const getUnionKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return _.union(keys1, keys2);
};

const buildASTTree = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { name: key, status: 'deleted', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, status: 'nested', children: buildASTTree(value1, value2) };
    }

    if (value1 === value2) {
      return { name: key, status: 'unchanged', value: value1 };
    }

    return {
      name: key,
      status: 'modified',
      valueBefore: value1,
      valueAfter: value2,
    };
  });

  return result;
};

export default buildASTTree;
