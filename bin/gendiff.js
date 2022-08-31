#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(path.resolve('__fixtures__', filepath1), 'utf-8');
    const file2 = fs.readFileSync(path.resolve('__fixtures__', filepath2), 'utf-8');
    const obj1 = JSON.parse(file1);
    const obj2 = JSON.parse(file2);
    if (path.extname(filepath1) === '.json') {
      console.log(genDiff(obj1, obj2));
    }
  });
program.parse();
