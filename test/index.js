import test from 'ava';
import {transform} from 'babel-core';
import es2015 from 'babel-preset-es2015';
import stage2 from 'babel-preset-stage-2';
import plugin from '../dist/index';

function babelES5Transform(t, input, expected) {
  const actual = transform(input, {plugins: [plugin]}).code;
  t.is(actual, expected);
}

function babelES6Transform(t, input, expected) {
  const actual = transform(input, {plugins: [plugin], presets: [es2015, stage2]}).code;
  t.is(actual, '"use strict";\n\n' + expected);
}

function title(providedTitle, input, expected) {
  return providedTitle ? providedTitle : `"${input}" becomes "${expected}"`;
}

babelES5Transform.title = title;
babelES6Transform.title = title;

test(
  'constant boolean unchanged',
  [babelES5Transform, babelES6Transform],
  'var a = true;',
  'var a = true;'
);

test(
  'true boolean and expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = true && true;',
  'var a = true;'
);

test(
  'true boolean or expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = false || true;',
  'var a = true;'
);

test(
  'false boolean or expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = false || false;',
  'var a = false;'
);

test(
  'true boolean mixed expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = true && false || true;',
  'var a = true;'
);

test(
  'false boolean mixed expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = true && (false || false);',
  'var a = false;'
);

test(
  'inferred boolean expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = true; var b = false || a;',
  'var a = true;var b = true;'
);

test(
  'boolean expression with variable partially reduced',
  [babelES5Transform, babelES6Transform],
  'var a = b || true && false;',
  'var a = b || false;'
);

test(
  'constant number unchanged',
  [babelES5Transform, babelES6Transform],
  'var a = 1;',
  'var a = 1;'
);

test(
  'number addition expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = 1 + 1;',
  'var a = 2;'
);

test(
  'number subtraction expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = 1 - 1;',
  'var a = 0;'
);

test(
  'number multiplication expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = 2 * 2;',
  'var a = 4;'
);

test(
  'number division expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = 2 / 2;',
  'var a = 1;'
);

test(
  'number exponential expression reduced',
  [babelES6Transform],
  'var a = 4 ** 2;',
  'var a = 16;'
);

test(
  'number mixed expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = 2 * 2 + 2 * 2;',
  'var a = 8;'
);

test(
  'inferred number expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = 2 + 2; var b = a * 2;',
  'var a = 4;var b = 8;'
);

test(
  'number library abs calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.abs(-2);',
  'var a = 2;'
);

test(
  'number library cbrt calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.cbrt(27);',
  'var a = 3;'
);

test(
  'number library ceil calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.ceil(2.1);',
  'var a = 3;'
);

test(
  'number library max calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.max(-1, 2, -2);',
  'var a = 2;'
);

test(
  'number library min calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.min(-1, 2, -2);',
  'var a = -2;'
);

test(
  'number library pow calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.pow(2, 3);',
  'var a = 8;'
);

test(
  'number library Math.random calls not reduced',
  [babelES5Transform, babelES6Transform],
  'var a = Math.random();',
  'var a = Math.random();'
);

test(
  'number expression with variable partially reduced',
  [babelES5Transform, babelES6Transform],
  'var a = b + 2 * 2;',
  'var a = b + 4;'
);

test(
  'constant single quoted string unchanged',
  [babelES5Transform],
  'var a = \'a\';',
  'var a = \'a\';'
);

test(
  'constant double quoted string unchanged',
  [babelES5Transform, babelES6Transform],
  'var a = "a";',
  'var a = "a";'
);

test(
  'single quoted string concat expression reduced',
  [babelES5Transform],
  'var a = \'a\' + \'a\';',
  'var a = \'aa\';'
);

test(
  'double quoted string concat expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = "a" + "a";',
  'var a = "aa";'
);

test(
  'inferred string concat expression reduced',
  [babelES5Transform, babelES6Transform],
  'var a = "a"; var b = a + "a";',
  'var a = "a";var b = "aa";'
);

test(
  'string libary charAt calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = "abc".charAt(1);',
  'var a = "b";'
);

test(
  'string libary trim calls reduced',
  [babelES5Transform, babelES6Transform],
  'var a = "  a  ".trim();',
  'var a = "a";'
);

test(
  'string libary includes calls reduced',
  [babelES6Transform],
  'var a = "abc".includes("c");',
  'var a = true;'
);

test(
  'string expression with variable partially reduced',
  [babelES5Transform, babelES6Transform],
  'var a = "a" + "b" + c;',
  'var a = "ab" + c;'
);
