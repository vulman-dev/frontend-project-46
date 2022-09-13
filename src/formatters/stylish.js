import _ from 'lodash';

const currentIndent = (depth, indent = 4) => ' '.repeat(depth * indent - 2);
const currentIndentBig = (depth, indent = 4) => ' '.repeat(depth * indent);
const getBracketIndent = (depth, indent = 4) => ' '.repeat(depth * indent - 4);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, valueKey]) => `${currentIndent(depth)}  ${key}: ${stringify(valueKey, depth + 1)}`);
  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const newIndent = currentIndent(depth);
    const newIndentBig = currentIndentBig(depth);
    const bracketIndent = getBracketIndent(depth);
    const result = node.map((obj) => {
      switch (obj.status) {
        case 'added':
          return `${newIndent}+ ${obj.name}: ${stringify(obj.value, depth)}`;
        case 'deleted':
          return `${newIndent}- ${obj.name}: ${stringify(obj.value, depth)}`;
        case 'unchanged':
          return `${newIndentBig}  ${obj.name}: ${stringify(obj.value, depth)}`;
        case 'modified':
          return `${newIndent}- ${obj.name}: ${stringify(obj.valueBefore, depth)}\n${newIndent}+ ${obj.name}: ${stringify(obj.valueAfter, depth)}`;
        case 'nested':
          return `${newIndentBig}${obj.name}: ${iter(obj.children, depth + 1)}`;
        default:
          throw new Error(`Type is not defined - ${obj.status}`);
      }
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
