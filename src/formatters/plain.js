/* eslint-disable no-unreachable */
import _ from 'lodash';

const plain = (tree) => {
  const iter = (node, acc) => {
    const setValueText = (value) => {
      if (_.isObject(value)) {
        return '[complex value]';
      }

      if (typeof value === 'string') {
        return `'${value}'`;
      }

      return value;
    };

    const result = node.reduce((accum, obj) => {
      const name = acc ? `${acc}.${obj.name}` : obj.name;
      switch (obj.status) {
        case 'unchanged':
          return accum;
        case 'added':
          return [...accum, `Property '${name}' was added with value: ${setValueText(obj.value)}`];
        case 'deleted':
          return [...accum, `Property '${name}' was removed`];
        case 'modified':
          return [...accum, `Property '${name}' was updated. From ${setValueText(obj.valueBefore)} to ${setValueText(obj.valueAfter)}`];
        default:
          return [...accum, iter(obj.children, `${name}`)];
      }
    }, []);

    return result.join('\n');
  };

  return iter(tree, '');
};

export default plain;
