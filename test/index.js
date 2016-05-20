import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../dist/index';

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

test('inferred boolean expression reduced', t => {
  const example = 'var a = true; var b = false || a;';
  const expected = 'var a = true;var b = true;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('boolean expression with variable partially reduced', t => {
  const example = 'var a = b || true && false;';
  const expected = 'var a = b || false;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('constant number unchanged', t => {
  const example = 'var a = 1;';
  const expected = 'var a = 1;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number addition expression reduced', t => {
  const example = 'var a = 1 + 1;';
  const expected = 'var a = 2;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number subtraction expression reduced', t => {
  const example = 'var a = 1 - 1;';
  const expected = 'var a = 0;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number multiplication expression reduced', t => {
  const example = 'var a = 2 * 2;';
  const expected = 'var a = 4;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number division expression reduced', t => {
  const example = 'var a = 2 / 2;';
  const expected = 'var a = 1;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number mixed expression reduced', t => {
  const example = 'var a = 2 * 2 + 2 * 2;';
  const expected = 'var a = 8;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('inferred number expression reduced', t => {
  const example = 'var a = 2 + 2; var b = a * 2;';
  const expected = 'var a = 4;var b = 8;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library abs calls reduced', t => {
  const example = 'var a = Math.abs(-2);';
  const expected = 'var a = 2;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library cbrt calls reduced', t => {
  const example = 'var a = Math.cbrt(27);';
  const expected = 'var a = 3;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library ceil calls reduced', t => {
  const example = 'var a = Math.ceil(2.1);';
  const expected = 'var a = 3;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library max calls reduced', t => {
  const example = 'var a = Math.max(-1, 2, -2);';
  const expected = 'var a = 2;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library min calls reduced', t => {
  const example = 'var a = Math.min(-1, 2, -2);';
  const expected = 'var a = -2;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library pow calls reduced', t => {
  const example = 'var a = Math.pow(2, 3);';
  const expected = 'var a = 8;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number library Math.random calls not reduced', t => {
  const example = 'var a = Math.random();';
  const expected = 'var a = Math.random();';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('number expression with variable partially reduced', t => {
  const example = 'var a = b + 2 * 2;';
  const expected = 'var a = b + 4;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('constant single quoted string unchanged', t => {
  const example = 'var a = \'a\';';
  const expected = 'var a = \'a\';';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('constant double quoted string unchanged', t => {
  const example = 'var a = "a";';
  const expected = 'var a = "a";';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('single quoted string concat expression reduced', t => {
  const example = 'var a = \'a\' + \'a\';';
  const expected = 'var a = \'aa\';';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('double quoted string concat expression reduced', t => {
  const example = 'var a = "a" + "a";';
  const expected = 'var a = "aa";';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('inferred string concat expression reduced', t => {
  const example = 'var a = "a"; var b = a + "a";';
  const expected = 'var a = "a";var b = "aa";';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('string libary charAt calls reduced', t => {
  const example = 'var a = "abc".charAt(1);';
  const expected = 'var a = "b";';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('string libary trim calls reduced', t => {
  const example = 'var a = "  a  ".trim();';
  const expected = 'var a = "a";';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('string libary includes calls reduced', t => {
  const example = 'var a = "abc".includes("c");';
  const expected = 'var a = true;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});

test('string expression with variable partially reduced', t => {
  const example = 'var a = "a" + "b" + c;';
  const expected = 'var a = "ab" + c;';
  const actual = transform(example, {plugins: [plugin]}).code;
  t.is(actual, expected);
});
