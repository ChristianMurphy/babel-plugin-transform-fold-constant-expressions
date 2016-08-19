# Babel Plugin Transform Fold Constant Expressions

[![Build Status](https://travis-ci.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions.svg?branch=master)](https://travis-ci.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions)
[![devDependency Status](https://david-dm.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions/dev-status.svg)](https://david-dm.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions?type=dev)

optimize javascript code with constant expression folding.

## Example

Input

``` js
var a = true || false;
var b = 2 + 3 * 8;
```

Output

``` js
var a = true;
var b = 26;
```
