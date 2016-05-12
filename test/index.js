import test from 'ava';
import babel from 'babel-core';
import plugin from '../dist/index';

test('constant unchanged', t => {
  const example = 'var a = 1';
  const expected = 'var a = 1';
  const actual = babel.transform(example, {plugins: [plugin]});
  t.is(actual, expected);
});
