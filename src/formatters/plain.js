import _ from 'lodash';

const stringify = (value) => {
  if ((_.isObject(value))) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (tree) => {
  const iter = (node, acc) => {
    const result = node.reduce((accum, fileContent) => {
      const name = acc ? `${acc}.${fileContent.name}` : fileContent.name;
      switch (fileContent.status) {
        case 'unchanged':
          return accum;
        case 'added':
          return [...accum, `Property '${name}' was added with value: ${stringify(fileContent.value)}`];
        case 'deleted':
          return [...accum, `Property '${name}' was removed`];
        case 'modified':
          return [...accum, `Property '${name}' was updated. From ${stringify(fileContent.valueBefore)} to ${stringify(fileContent.valueAfter)}`];
        case 'nested':
          return [...accum, iter(fileContent.children, `${name}`)];
        default:
          throw new Error(`Unknown state: '${fileContent.status}'!`);
      }
    }, []);
    return _.compact(result).join('\n');
  };

  return iter(tree, '');
};

export default plain;
