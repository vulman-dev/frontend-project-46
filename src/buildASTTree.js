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

    const node = {
      name: key,
    };

    if (!Object.hasOwn(obj1, key)) {
      node.status = 'added';
      node.value = value2;

      return node;
    }
    if (!Object.hasOwn(obj2, key)) {
      node.status = 'deleted';
      node.value = value1;

      return node;
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      node.status = 'nested';
      node.children = buildASTTree(value1, value2);

      return node;
    }

    if (value1 === value2) {
      node.status = 'unchanged';
      node.value = value1;

      return node;
    }

    node.status = 'modified';
    node.valueBefore = value1;
    node.valueAfter = value2;

    return node;
  });

  return result;
};

export default buildASTTree;
