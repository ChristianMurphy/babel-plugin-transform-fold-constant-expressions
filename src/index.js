export default function({types: t}) {
  /**
   * Visitor for expressions looks if children are literal values and the same
   * type then reduces expressions when possible.
   * @param {Object} path - an AST expression node
   */
  function visit(path) {
    let replacement = null;
    if (t.isNumericLiteral(path.node.left) && t.isNumericLiteral(path.node.right)) {
      replacement = t.numericLiteral(evaluate(path));
    } else if (t.isBooleanLiteral(path.node.left) && t.isBooleanLiteral(path.node.right)) {
      replacement = t.booleanLiteral(evaluate(path));
    }

    if (replacement) {
      path.replaceWith(replacement);
    }
  }

  /**
   * Evaluates an AST expression
   * @param {Object} path - an AST node with an operator, a left, and right child
   * @return {any} literal value of the expression
   */
  function evaluate(path) {
    return eval(`${path.node.left.value} ${path.node.operator} ${path.node.right.value}`);
  }

  return {
    visitor: {
      BinaryExpression: {
        exit: visit
      },
      LogicalExpression: {
        exit: visit
      }
    }
  };
}
