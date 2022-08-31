import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parser.js';

const getUnionKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return _.union(keys1, keys2);
};

const genDiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');

  const obj1 = parseFile(file1, path.extname(filepath1));
  const obj2 = parseFile(file2, path.extname(filepath2));

  const keys = getUnionKeys(obj1, obj2);
  const sortedKeys = _.sortBy(keys);

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
