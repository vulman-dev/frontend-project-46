/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import parseFile from '../src/parser.js';

let file1 = '';
let file2 = '';
let file3 = '';
let file4 = '';

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const expectedNestedFile = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

beforeEach(() => {
  file1 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/file1.json'), 'utf-8');
  file2 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/file1.yml'), 'utf-8');
  file3 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/nestedFile1.json'), 'utf-8');
  file4 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/nestedFile1.yml'), 'utf-8');
});

test('json file', () => {
  const actual = parseFile(file1, '.json');
  const actual2 = parseFile(file3, '.json');

  expect(actual).toEqual(expected);
  expect(actual2).toEqual(expectedNestedFile);
});

test('yaml file', () => {
  const actual = parseFile(file2, '.yml');
  const actual2 = parseFile(file4, '.yml');

  expect(actual).toEqual(expected);
  expect(actual2).toEqual(expectedNestedFile);
});

test('another format', () => {
  const actual = parseFile(file1, '.exe');
  const actual2 = parseFile(file3, '.exe');

  expect(actual).toEqual({});
  expect(actual2).toEqual({});
});
