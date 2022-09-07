import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parser.js';
import formatTree from './formatters/index.js';

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

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');

  const obj1 = parseFile(file1, path.extname(filepath1));
  const obj2 = parseFile(file2, path.extname(filepath2));

  const ASTTree = buildASTTree(obj1, obj2);

  return formatTree(ASTTree, format);
};

export default genDiff;
