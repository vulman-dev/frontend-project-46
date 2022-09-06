/* eslint-disable no-undef */
import genDiff from '../src/index.js';

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedNestedFile = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('json files', () => {
  const actual = genDiff('file1.json', 'file2.json');
  const actual2 = genDiff('nestedFile1.json', 'nestedFile2.json');

  expect(actual).toEqual(expected);
  expect(actual2).toEqual(expectedNestedFile);
});

test('yaml files', () => {
  const actual = genDiff('file1.yml', 'file2.yaml');
  const actual2 = genDiff('nestedFile1.yml', 'nestedFile2.yaml');

  expect(actual).toEqual(expected);
  expect(actual2).toEqual(expectedNestedFile);
});
