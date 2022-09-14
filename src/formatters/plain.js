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
    const result = node.reduce((accum, obj) => {
      const name = acc ? `${acc}.${obj.name}` : obj.name;
      switch (obj.status) {
        case 'unchanged':
          return accum;
        case 'added':
          return [...accum, `Property '${name}' was added with value: ${stringify(obj.value)}`];
        case 'deleted':
          return [...accum, `Property '${name}' was removed`];
        case 'modified':
          return [...accum, `Property '${name}' was updated. From ${stringify(obj.valueBefore)} to ${stringify(obj.valueAfter)}`];
        case 'nested':
          return [...accum, iter(obj.children, `${name}`)];
        default:
          throw new Error(`Unknown state: '${obj.status}'!`);
      }
    }, []);
    return _.compact(result).join('\n');
  };

  return iter(tree, '');
};

export default plain;
