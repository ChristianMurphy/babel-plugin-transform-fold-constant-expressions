import test from 'ava';
import {transform} from 'babel-core';
import plugin from '../dist/index';

function babelTransform(t, input, expected) {
  const actual = transform(input, {plugins: [plugin]}).code;
  t.is(actual, expected);
}

babelTransform.title = (providedTitle, input, expected) => {
  return providedTitle ? providedTitle : `"${input}" becomes "${expected}"`;
};

test(
  'constant boolean unchanged',
  babelTransform,
  'var a = true;',
  'var a = true;'
);

test(
  'true boolean and expression reduced',
  babelTransform,
  'var a = true && true;',
  'var a = true;'
);

test(
  'true boolean or expression reduced',
  babelTransform,
  'var a = false || true;',
  'var a = true;'
);

test(
  'false boolean or expression reduced',
  babelTransform,
  'var a = false || false;',
  'var a = false;'
);

test(
  'true boolean mixed expression reduced',
  babelTransform,
  'var a = true && false || true;',
  'var a = true;'
);

test(
  'false boolean mixed expression reduced',
  babelTransform,
  'var a = true && (false || false);',
  'var a = false;'
);

test(
  'inferred boolean expression reduced',
  babelTransform,
  'var a = true; var b = false || a;',
  'var a = true;var b = true;'
);

test(
  'boolean expression with variable partially reduced',
  babelTransform,
  'var a = b || true && false;',
  'var a = b || false;'
);

test(
  'constant number unchanged',
  babelTransform,
  'var a = 1;',
  'var a = 1;'
);

test(
  'number addition expression reduced',
  babelTransform,
  'var a = 1 + 1;',
  'var a = 2;'
);

test(
  'number subtraction expression reduced',
  babelTransform,
  'var a = 1 - 1;',
  'var a = 0;'
);

test(
  'number multiplication expression reduced',
  babelTransform,
  'var a = 2 * 2;',
  'var a = 4;'
);

test(
  'number division expression reduced',
  babelTransform,
  'var a = 2 / 2;',
  'var a = 1;'
);

test(
  'number mixed expression reduced',
  babelTransform,
  'var a = 2 * 2 + 2 * 2;',
  'var a = 8;'
);

test(
  'inferred number expression reduced',
  babelTransform,
  'var a = 2 + 2; var b = a * 2;',
  'var a = 4;var b = 8;'
);

test(
  'number library abs calls reduced',
  babelTransform,
  'var a = Math.abs(-2);',
  'var a = 2;'
);

test(
  'number library cbrt calls reduced',
  babelTransform,
  'var a = Math.cbrt(27);',
  'var a = 3;'
);

test(
  'number library ceil calls reduced',
  babelTransform,
  'var a = Math.ceil(2.1);',
  'var a = 3;'
);

test(
  'number library max calls reduced',
  babelTransform,
  'var a = Math.max(-1, 2, -2);',
  'var a = 2;'
);

test(
  'number library min calls reduced',
  babelTransform,
  'var a = Math.min(-1, 2, -2);',
  'var a = -2;'
);

test(
  'number library pow calls reduced',
  babelTransform,
  'var a = Math.pow(2, 3);',
  'var a = 8;'
);

test(
  'number library Math.random calls not reduced',
  babelTransform,
  'var a = Math.random();',
  'var a = Math.random();'
);

test(
  'number expression with variable partially reduced',
  babelTransform,
  'var a = b + 2 * 2;',
  'var a = b + 4;'
);

test(
  'constant single quoted string unchanged',
  babelTransform,
  'var a = \'a\';',
  'var a = \'a\';'
);

test(
  'constant double quoted string unchanged',
  babelTransform,
  'var a = "a";',
  'var a = "a";'
);

test(
  'single quoted string concat expression reduced',
  babelTransform,
  'var a = \'a\' + \'a\';',
  'var a = \'aa\';'
);

test(
  'double quoted string concat expression reduced',
  babelTransform,
  'var a = "a" + "a";',
  'var a = "aa";'
);

test(
  'inferred string concat expression reduced',
  babelTransform,
  'var a = "a"; var b = a + "a";',
  'var a = "a";var b = "aa";'
);

test(
  'string libary charAt calls reduced',
  babelTransform,
  'var a = "abc".charAt(1);',
  'var a = "b";'
);

test(
  'string libary trim calls reduced',
  babelTransform,
  'var a = "  a  ".trim();',
  'var a = "a";'
);

test(
  'string libary includes calls reduced',
  babelTransform,
  'var a = "abc".includes("c");',
  'var a = true;'
);

test(
  'string expression with variable partially reduced',
  babelTransform,
  'var a = "a" + "b" + c;',
  'var a = "ab" + c;'
);
