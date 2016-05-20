export default function({types: t}) {
  /**
   * Visitor for expressions looks if children are literal
   * values and the same type then reduces expressions when possible.
   * @param {Object} path - an AST expression node
   */
  function reduceExpressions(path) {
    const replacement = evaluate(path);

    if (replacement) {
      path.replaceWith(replacement);
    }
  }

  /**
   * Takes in an expression and attempts to evaluate it
   * @param {Object} path - AST path that is an expression
   * @return {Object|null} reduced AST node or null if unable to evaluate
   */
  function evaluate(path) {
    const result = path.evaluate();
    if (result.confident === false) {
      return null;
    }
    switch (typeof result.value) {
      case 'string':
        return t.stringLiteral(result.value);
      case 'number':
        return t.numericLiteral(result.value);
      case 'boolean':
        return t.booleanLiteral(result.value);
      default:
        return null;
    }
  }

  return {
    visitor: {
      BinaryExpression: {
        exit: reduceExpressions
      },
      LogicalExpression: {
        exit: reduceExpressions
      },
      CallExpression: {
        exit: reduceExpressions
      }
    }
  };
}
