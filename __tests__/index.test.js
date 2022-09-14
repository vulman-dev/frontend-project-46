/* eslint-disable no-undef */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const getContent = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

const cases = [
  ['json', 'stylish', 'stylish.txt'],
  ['json', 'plain', 'plain.txt'],
  ['json', 'json', 'json.txt'],
  ['yml', 'stylish', 'stylish.txt'],
  ['yml', 'plain', 'plain.txt'],
  ['yml', 'json', 'json.txt'],
];

describe('test genDiff, each cases', () => {
  test.each(cases)(
    'files of type %p formatted as %p are expected to match %p',
    (type, format, expectedResult) => {
      const file1 = getFilePath(`nestedFile1.${type}`);
      const file2 = getFilePath(`nestedFile2.${type}`);
      const readDiff = genDiff(file1, file2, format).trim();
      const result = getContent(expectedResult).trim();
      expect(readDiff).toEqual(result);
    },
  );
});
