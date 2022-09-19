import _ from 'lodash';

const currentIndent = (depth, indent = 4) => ' '.repeat(depth * indent - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, valueKey]) => `  ${currentIndent(depth)}${key}: ${stringify(valueKey, depth + 1)}`);
  return ['{', ...lines, `${currentIndent(depth).slice(2)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.map((fileContent) => {
      switch (fileContent.status) {
        case 'added':
          return `${currentIndent(depth)}+ ${fileContent.name}: ${stringify(fileContent.value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent(depth)}- ${fileContent.name}: ${stringify(fileContent.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent(depth)}  ${fileContent.name}: ${stringify(fileContent.value, depth + 1)}`;
        case 'modified':
          return `${currentIndent(depth)}- ${fileContent.name}: ${stringify(fileContent.valueBefore, depth + 1)}\n${currentIndent(depth)}+ ${fileContent.name}: ${stringify(fileContent.valueAfter, depth + 1)}`;
        case 'nested':
          return `${currentIndent(depth)}  ${fileContent.name}: ${iter(fileContent.children, depth + 1)}`;
        default:
          throw new Error(`Type is not defined - ${fileContent.status}`);
      }
    });
    return ['{', ...result, `${currentIndent(depth).slice(2)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
