import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatTree = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Format is not defined ${format}`);
  }
};

export default formatTree;
