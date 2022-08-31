/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import parseFile from '../src/parser.js';

let file1 = '';
let file2 = '';

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

beforeEach(() => {
  file1 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/file1.json'), 'utf-8');
  file2 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/file1.yml'), 'utf-8');
});

test('json file', () => {
  const actual = parseFile(file1, '.json');
  expect(actual).toEqual(expected);
});

test('yaml file', () => {
  const actual = parseFile(file2, '.yml');
  expect(actual).toEqual(expected);
});

test('another format', () => {
  const actual = parseFile(file1, '.exe');
  expect(actual).toEqual({});
});
