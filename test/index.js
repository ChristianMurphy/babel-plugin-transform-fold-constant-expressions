import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../dist/index';

test('constant number unchanged', t => {
  const example = 'var a = 1;';
  const expected = 'var a = 1;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('constant boolean unchanged', t => {
  const example = 'var a = true;';
  const expected = 'var a = true;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('true boolean and expression reduced', t => {
  const example = 'var a = true && true;';
  const expected = 'var a = true;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('true boolean or expression reduced', t => {
  const example = 'var a = false || true;';
  const expected = 'var a = true;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('false boolean or expression reduced', t => {
  const example = 'var a = false || false;';
  const expected = 'var a = false;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('true boolean mixed expression reduced', t => {
  const example = 'var a = true && false || true;';
  const expected = 'var a = true;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('false boolean mixed expression reduced', t => {
  const example = 'var a = true && (false || false);';
  const expected = 'var a = false;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('boolean expression with variable partially reduced', t => {
  const example = 'var a = b || true && false;';
  const expected = 'var a = b || false;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});
