import stylish from './stylish.js';
import plain from './plain.js';

const formatTree = (tree, format) => {
  if (format === 'stylish') {
    return stylish(tree);
  }

  if (format === 'plain') {
    return plain(tree);
  }

  return {};
};

export default formatTree;
