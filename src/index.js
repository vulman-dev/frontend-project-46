import fs from 'fs';
import path from 'path';
import parseFile from './parser.js';
import formatTree from './formatters/index.js';
import buildTreeDifference from './buildTreeDifference.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedData1 = fs.readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
  const parsedData2 = fs.readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');

  const fileContent1 = parseFile(parsedData1, path.extname(filepath1).slice(1));
  const fileContent2 = parseFile(parsedData2, path.extname(filepath2).slice(1));

  const treeDifference = buildTreeDifference(fileContent1, fileContent2);

  return formatTree(treeDifference, format);
};

export default genDiff;
