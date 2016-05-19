export default function({types: t}) {
  /**
   * Visitor for expressions looks if children are literal values and the same
   * type then reduces expressions when possible.
   * @param {Object} path - an AST expression node
   */
  function visit(path) {
    let replacement = null;
    if (t.isNumericLiteral(path.node.left) && t.isNumericLiteral(path.node.right)) {
      replacement = t.numericLiteral(eval(`${path.node.left.value} ${path.node.operator} ${path.node.right.value}`));
    } else if (t.isBooleanLiteral(path.node.left) && t.isBooleanLiteral(path.node.right)) {
      replacement = t.booleanLiteral(eval(`${path.node.left.value} ${path.node.operator} ${path.node.right.value}`));
    } else if (t.isStringLiteral(path.node.left) && t.isStringLiteral(path.node.right)) {
      replacement = t.stringLiteral(eval(`'${path.node.left.value}' ${path.node.operator} '${path.node.right.value}'`));
    }

    if (replacement) {
      path.replaceWith(replacement);
    }
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
