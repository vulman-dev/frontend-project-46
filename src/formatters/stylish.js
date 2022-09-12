/* eslint-disable no-case-declarations */
import _ from 'lodash';

const currentIndent = (depth, indent = 4) => ' '.repeat(indent * depth - 2);

const stringify = (value, depth) => {
  if (_.isObject(value)) {
    return stringify([value], depth + 1);
  }

  return value;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.map((obj) => {
      switch (obj.status) {
        case 'added':
          return `${currentIndent(depth)}+ ${obj.name}: ${stringify(obj.value, depth)}`;
        case 'deleted':
          return `${currentIndent(depth)}- ${obj.name}: ${stringify(obj.value, depth)}`;
        case 'unchanged':
          return `${currentIndent(depth)}  ${obj.name}: ${stringify(obj.value, depth)}`;
        case 'modified':
          const valueBefore = `${currentIndent(depth)}- ${obj.name}: ${stringify(obj.valueBefore, depth)}`;
          const valueAfter = `${currentIndent(depth)}+ ${obj.name}: ${stringify(obj.valueAfter, depth)}`;
          return `${valueBefore}\n${valueAfter}`;
        case 'nested':
          return `${currentIndent(depth)}${obj.name}: ${iter(obj.children, depth + 1)}`;
        default:
          throw new Error(`Type is not defined - ${obj.status}`);
      }

      const keys = Object.keys(obj);
      const nestedObj = keys.map((key) => `${currentIndent(depth)}${key}: ${stringify(obj[key], depth)}`);

      return nestedObj.join('\n');
    });

    return [
      '{',
      ...result,
      '}',
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
