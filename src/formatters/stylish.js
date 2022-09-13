import _ from 'lodash';

const currentIndent = (depth, indent = 4) => ' '.repeat(depth * indent - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, valueKey]) => `${currentIndent(depth)}  ${key}: ${stringify(valueKey, depth + 1)}`);
  return ['{', ...lines, `${currentIndent(depth)}}`].join('\n');
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
          return `${currentIndent(depth)}- ${obj.name}: ${stringify(obj.valueBefore, depth)}\n${currentIndent(depth)}+ ${obj.name}: ${stringify(obj.valueAfter, depth)}`;
        case 'nested':
          return `${currentIndent(depth)}${obj.name}: ${iter(obj.children, depth + 1)}`;
        default:
          throw new Error(`Type is not defined - ${obj.status}`);
      }
    });
    return ['{', ...result, `${currentIndent(depth, 2)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
