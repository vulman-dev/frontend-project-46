import jsYaml from 'js-yaml';

const parseFile = (filename, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(filename);
    case '.yml' || '.yaml':
      return jsYaml.load(filename);
    default:
      throw new Error(`${ext} - invalid type of parser!`);
  }
};

export default parseFile;
