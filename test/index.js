import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../dist/index';

test('constant unchanged', t => {
  const example = 'var a = 1;';
  const expected = 'var a = 1;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});
