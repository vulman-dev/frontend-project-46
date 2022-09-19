import _ from 'lodash';

const getUnionKeys = (fileContent1, fileContent2) => {
  const keys1 = Object.keys(fileContent1);
  const keys2 = Object.keys(fileContent2);

  return _.union(keys1, keys2);
};

const buildTreeDifference = (fileContent1, fileContent2) => {
  const keys = getUnionKeys(fileContent1, fileContent2);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const value1 = fileContent1[key];
    const value2 = fileContent2[key];

    if (!Object.hasOwn(fileContent1, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    if (!Object.hasOwn(fileContent2, key)) {
      return { name: key, status: 'deleted', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, status: 'nested', children: buildTreeDifference(value1, value2) };
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

export default buildTreeDifference;
