import fs from 'fs';
import path from 'path';
import parseFile from './parser.js';
import formatTree from './formatters/index.js';
import buildASTTree from './buildASTTree.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');

  const obj1 = parseFile(file1, path.extname(filepath1));
  const obj2 = parseFile(file2, path.extname(filepath2));

  const ASTTree = buildASTTree(obj1, obj2);

  return formatTree(ASTTree, format);
};

export default genDiff;
