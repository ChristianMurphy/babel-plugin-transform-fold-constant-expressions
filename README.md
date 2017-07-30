# Babel Plugin Transform Fold Constant Expressions

[![Unmaintained](https://img.shields.io/maintenance/no/2017.svg)]()
[![Build Status](https://travis-ci.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions.svg?branch=master)](https://travis-ci.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions)
[![devDependency Status](https://david-dm.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions/dev-status.svg)](https://david-dm.org/ChristianMurphy/babel-plugin-transform-fold-constant-expressions?type=dev)

:warning: **UNMAINTAINED** :warning:

This package is no longer maintained.

[Babili](https://github.com/babel/babili) or [Prepack](https://github.com/facebook/prepack) are two excellent alternatives.

---

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
