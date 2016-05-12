export default function ({types: t}) {
  function visit (path) {
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
